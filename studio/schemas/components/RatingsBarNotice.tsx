import { Badge, Card, Flex, Stack, Text } from '@sanity/ui';
import { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { IntentLink } from 'sanity/router';

type RatingRow = { platform?: string; score?: string; count?: string };

const PLATFORM_NAMES: Record<string, string> = { carwise: 'CARWISE', google: 'Google', yelp: 'Yelp' };

/**
 * Read-only block for the homepage's "Ratings bar" tab: tells editors the shared ratings bar sits on this
 * page (right below the hero), shows the numbers it currently has, and links to where they are edited.
 * Nothing is stored on the homepage document.
 */
export function RatingsBarNotice() {
  const client = useClient({ apiVersion: '2026-09-15' });
  const [rows, setRows] = useState<RatingRow[] | null>(null);

  useEffect(() => {
    let live = true;
    // The draft (if any) sorts before the published document, so [0] is what the editor last saved.
    client
      .fetch<RatingRow[] | null>(`*[_id in ["drafts.ratingsBar", "ratingsBar"]] | order(_id asc)[0].items`)
      .then((items) => live && setRows(items ?? []))
      .catch(() => live && setRows([]));
    return () => {
      live = false;
    };
  }, [client]);

  return (
    <Card padding={4} radius={2} tone="primary" border>
      <Stack space={4}>
        <Flex align="center" gap={2}>
          <Badge tone="primary">Shared block</Badge>
          <Text size={1} weight="semibold">
            Ratings bar — shown on this page, right below the Hero and above Services
          </Text>
        </Flex>

        <Text size={1} muted>
          The CARWISE / Google / Yelp scores are one site-wide block, used on every page that shows the ratings bar.
          They are not edited here — change them once and every page updates.
        </Text>

        <Card padding={3} radius={2} tone="default" border>
          <Stack space={3}>
            <Text size={0} weight="semibold" muted>
              CURRENT NUMBERS
            </Text>
            {rows === null ? (
              <Text size={1} muted>
                Loading…
              </Text>
            ) : rows.length === 0 ? (
              <Text size={1} muted>
                No numbers saved yet — the website is showing its built-in defaults.
              </Text>
            ) : (
              rows.map((row, i) => (
                <Text size={1} key={`${row.platform}-${i}`}>
                  <strong>{PLATFORM_NAMES[row.platform ?? ''] ?? row.platform}</strong> · {row.score} · {row.count}
                </Text>
              ))
            )}
          </Stack>
        </Card>

        <Text size={1}>
          <IntentLink intent="edit" params={{ id: 'ratingsBar', type: 'ratingsBar' }}>
            Edit the ratings bar →
          </IntentLink>
        </Text>
      </Stack>
    </Card>
  );
}
