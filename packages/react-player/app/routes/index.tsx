import { Framework, PageConfig, moveStyleUtils } from "@ruijs/move-style";
import { Rui } from "@ruijs/react-renderer";
import { HtmlElement, Box, Label, Text } from "@ruijs/react-rocks";
import { AntdRocks } from "@ruijs/antd-rocks";
import { useState } from "react";

import styles from "antd/dist/antd.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const framework = new Framework();

framework.registerComponent(HtmlElement);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(Text);

for(const name in AntdRocks) {
  framework.registerComponent(AntdRocks[name]);
}


const initialPageConfig: PageConfig = {
  view: [
    {
      $type: "htmlElement",
      htmlTag: "ul",
      children: ['components', 'modal', 'new-form', 'edit-form', 'table'].map((item) => {
        return {
          $type: "htmlElement",
          htmlTag: "li",
          children: {
            $type: "htmlElement",
            htmlTag: "a",
            attributes: {
              href: "/demo/" + item,
            },
            children: {
              $type: "text",
              text: "/demo/" + item,
            }
          },
        }
      }).concat([
        {
          $type: "htmlElement",
          htmlTag: "li",
          children: {
            $type: "htmlElement",
            htmlTag: "a",
            attributes: {
              href: "/designer",
            },
            children: {
              $type: "text",
              text: "/designer",
            }
          },
        }
      ])
    },
  ],
}

export default function Index() {
  const [page] = useState(initialPageConfig);

  return <Rui framework={framework} page={page} />
}
