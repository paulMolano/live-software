import type { Metadata } from "next";
import { Box, Text, Title } from "@mantine/core";

import { ContentArticle } from "../components/content-article";
import { LinkCardGrid } from "../components/link-card-grid";
import { guideRouteGroups, homePage } from "../content/guide-content";
import styles from "../styles/home.module.css";

export const metadata: Metadata = {
  title: "Home",
  description: homePage.description,
};

function routeGroupId(title: string): string {
  return `route-group-${title.toLowerCase().replaceAll(" ", "-")}`;
}

export default function HomePage() {
  return (
    <div className={styles["home"]}>
      <section className={styles["hero"]} aria-labelledby="guide-title">
        <div className={styles["heroText"]}>
          <ContentArticle page={homePage} titleId="guide-title" />
        </div>
        <Box className={styles["heroMap"]} aria-label="Guide workflow map">
          <div className={styles["mapRow"]}>
            <span className={styles["mapNode"]}>Issue</span>
            <span className={styles["mapArrow"]}>to</span>
            <span className={styles["mapNode"]}>Branch</span>
          </div>
          <div className={styles["mapRow"]}>
            <span className={styles["mapNode"]}>Validation</span>
            <span className={styles["mapArrow"]}>to</span>
            <span className={styles["mapNode"]}>PR</span>
          </div>
          <Text c="dimmed" className={styles["mapNote"]}>
            Meaningful changes update docs, update the guide, enter a future
            guide backlog or state that no guide update is needed.
          </Text>
        </Box>
      </section>

      <div className={styles["homeSections"]}>
        {guideRouteGroups.map((group) => (
          <section
            className={styles["routeGroup"]}
            key={group.title}
            aria-labelledby={routeGroupId(group.title)}
          >
            <div className={styles["routeGroupHeader"]}>
              <Title id={routeGroupId(group.title)} order={2}>
                {group.title}
              </Title>
              <Text c="dimmed">{group.description}</Text>
            </div>
            <LinkCardGrid links={group.links} />
          </section>
        ))}
      </div>
    </div>
  );
}
