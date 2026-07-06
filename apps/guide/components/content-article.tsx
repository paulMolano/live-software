"use client";

import {
  Anchor,
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import type { ContentSection, GuideContentPage } from "../content/guide-content";
import styles from "../styles/content.module.css";

function toSectionId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ContentSectionView({ section }: { section: ContentSection }) {
  const sectionId = toSectionId(section.title);

  return (
    <section className={styles["section"]} aria-labelledby={sectionId}>
      <Title className={styles["sectionTitle"]} id={sectionId} order={2}>
        {section.title}
      </Title>
      {section.body?.map((paragraph) => (
        <Text c="dimmed" className={styles["paragraph"]} key={paragraph}>
          {paragraph}
        </Text>
      ))}
      {section.bullets ? (
        <List className={styles["bulletList"]} spacing="sm">
          {section.bullets.map((bullet) => (
            <ListItem key={bullet}>{bullet}</ListItem>
          ))}
        </List>
      ) : null}
      {section.links ? (
        <List className={styles["linkList"]} listStyleType="none" spacing="sm">
          {section.links.map((link) => (
            <ListItem key={link.href}>
              <Anchor href={link.href}>{link.label}</Anchor>
            </ListItem>
          ))}
        </List>
      ) : null}
    </section>
  );
}

export function ContentArticle({
  page,
  titleId,
}: {
  page: GuideContentPage;
  titleId?: string;
}) {
  return (
    <article className={styles["article"]}>
      <header className={styles["intro"]}>
        <Text className={styles["eyebrow"]} component="p">
          {page.eyebrow}
        </Text>
        <Title className={styles["title"]} id={titleId} order={1}>
          {page.title}
        </Title>
        <Text c="dimmed" className={styles["description"]}>
          {page.description}
        </Text>
      </header>

      <Stack gap="xl">
        {page.sections.map((section) => (
          <ContentSectionView key={section.title} section={section} />
        ))}
      </Stack>

      {page.related ? (
        <nav className={styles["related"]} aria-label="Related guide pages">
          <Title order={2}>Related</Title>
          <List className={styles["relatedList"]} listStyleType="none" spacing="md">
            {page.related.map((link) => (
              <ListItem className={styles["relatedItem"]} key={link.href}>
                <Anchor
                  className={styles["relatedLink"]}
                  href={link.href}
                >
                  {link.label}
                </Anchor>
                <Text c="dimmed" className={styles["relatedDescription"]}>
                  {link.description}
                </Text>
              </ListItem>
            ))}
          </List>
        </nav>
      ) : null}
    </article>
  );
}
