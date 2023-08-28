import React, { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import { useAllClientsInEnvironments } from "../../../hooks/api";
import { Heading, Label, Paragraph, Select } from "@digdir/design-system-react";
import CodeLanguage from "./CodeLanguage";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { bold } from "../../util/textTransforms";
import {
  KeyHorizontalIcon,
  ClipboardIcon,
  BranchingIcon,
} from "@navikt/aksel-icons";
import { ApiClient } from "../../../types/api";
import { useConfig } from "../../../hooks/auth";

interface Props {
  title: string;
  children: ReactNode[] | ReactNode;
  filter: (client: ApiClient) => boolean;
  filterText: string;
}

function CodeExample(props: Props) {
  const { data: config } = useConfig();
  const { data: clients } = useAllClientsInEnvironments();
  const [selectValue, setSelectValue] = useState<string>();
  const [selectedTab, setSelectedTab] = useState(0);

  const formatLabel = (client: ApiClient) => (
    <div className={styles.selectFormattedBox}>
      {bold(client.clientId)}
      <span>
        <ClipboardIcon />
        {client.description}
      </span>
      <span>
        <KeyHorizontalIcon />
        {client.scopes.length > 1 ? `${client.scopes[0]}...` : client.scopes[0]}
      </span>
      <span>
        <BranchingIcon />
        {client.env}
      </span>
    </div>
  );

  const client_ids = clients?.filter(props.filter).map((client) => {
    return {
      label: client.clientId,
      formattedLabel: formatLabel(client),
      value: `${client.env}:${client.clientId}`,
    };
  });

  const examples = React.Children.map(props.children, (child) => {
    if (
      React.isValidElement(child) &&
      (child as React.ReactElement<any>).type === CodeLanguage
    ) {
      return {
        title: child.props.title,
        lang: child.props.language,
        code: child.props.code,
      };
    }
  });

  const makeFieldMap = (client?: ApiClient) => {
    const conf = client && config ? config[client.env] : config?.["test"];
    return {
      __CLIENT_ID__: client?.clientId || "<CLIENT-UUID>",
      __SCOPE__: client?.scopes.join(",") || "<SCOPE:WITHPREFIX>",
      __MASKINPORTEN_URL__:
        conf?.authorization_server || "__MASKINPORTEN_URL__",
      __MASKINPORTEN_TOKEN_URL__:
        conf?.token_endpoint || "__MASKINPORTEN_TOKEN_URL__",
      __KID__: client?.keys?.[0].kid || "__KID__",
    };
  };

  const processCode = (codeString: string): string => {
    const client = clients?.find((client) => {
      return selectValue === `${client.env}:${client.clientId}`;
    });

    const fieldMap = makeFieldMap(client);
    Object.entries(fieldMap).forEach(([key, value]) => {
      codeString = codeString.replaceAll(key, value);
    });

    return codeString;
  };

  return (
    <>
      <Heading size={"large"}>{props.title}</Heading>

      {client_ids && client_ids.length > 0 && (
        <>
          <Paragraph>
            Ved å legge inn hvilken tilgang du skal ta i bruk kan vi gi deg
            bedre kodeeksempler.
          </Paragraph>
          <div>
            <Heading className={styles.smallHeading} size={"small"}>
              Hvilken tilgang skal du ta i bruk?
            </Heading>
            <Paragraph spacing>
              Kun integrasjoner som bruker {props.filterText} vil dukke opp i
              listen under.
            </Paragraph>
            <div className={styles.selectionContainer}>
              <Select
                value={selectValue}
                options={client_ids}
                onChange={(value) => setSelectValue(value)}
              />
            </div>
          </div>
        </>
      )}
      <Heading className={styles.smallHeading} size={"small"}>
        Kode-eksempel:
      </Heading>
      <div className={styles.codeExampleBox}>
        <div className={styles.codeExampleTabs}>
          {examples &&
            examples.map((example, index) => (
              <span
                key={index}
                className={selectedTab === index ? styles.active : ""}
                onClick={() => setSelectedTab(index)}
              >
                {example.title}
              </span>
            ))}
        </div>
        <div className={styles.codeExampleContent}>
          {examples && (
            <SyntaxHighlighter
              customStyle={{ backgroundColor: "white" }}
              style={docco}
              showLineNumbers={true}
              wrapLines={false}
              wrapLongLines={false}
              language={examples.at(selectedTab)!!.lang}
            >
              {processCode(examples.at(selectedTab)!!.code.join("\n"))}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </>
  );
}

export default CodeExample;
