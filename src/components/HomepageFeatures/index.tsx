import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  icon: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Quick Integration",
    icon: "🏎",
    description: (
      <>
        Fastest way to build a better Web 3 UX for your users. Implement custom
        flows from social recovery to gasless transactions and more.
      </>
    ),
  },
  {
    title: "Modular Design",
    icon: "🏗",
    description: (
      <>
        Customize how you build and interact with wallets, paymasters, bundlers,
        and EntryPoints to fit your application's unique use case.
      </>
    ),
  },
  {
    title: "ERC-4337 Compliant",
    icon: "✅",
    description: (
      <>
        Use libraries that follow the latest specs as outlined in EIP-4337. This
        is currently the best standard for account abstraction.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <h1 className={styles.featureIcon}>{icon}</h1>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
