import React, { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useClients } from "../../../hooks/api";
import {
  Heading,
  Paragraph,
  ToggleGroup,
  Combobox,
} from "@digdir/design-system-react";
import CodeLanguage, { CodeDependency } from "./CodeLanguage";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ApiClient } from "../../../types/api";
import { useConfig } from "../../../hooks/auth";

interface Props {
  children: ReactNode[] | ReactNode;
  filter: (client: ApiClient) => boolean;
  filterText: string;
}

function CodeExample(props: Props) {
  const { data: config } = useConfig();
  const { data: testClients } = useClients(
    Object.keys(config || "")[0],
    !!config,
  );
  const { data: prodClients } = useClients(
    Object.keys(config || "")[1],
    !!testClients,
  );
  const [clients, setClients] = useState<ApiClient[]>([]);
  const [selectValue, setSelectValue] = useState<string[]>();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCode, setSelectedCode] = useState("code");

  useEffect(() => {
    if (!!testClients && !!prodClients) {
      setClients(testClients.concat(prodClients));
    }
  }, [testClients, prodClients]);

  const examples = React.Children.map(props.children, (child) => {
    if (
      React.isValidElement(child) &&
      (child as React.ReactElement<any>).type === CodeLanguage
    ) {
      return {
        title: child.props.title,
        lang: child.props.language,
        code: child.props.code,
        dependencies: child.props.dependencies,
      };
    }
  });

  const getDependencies = () => {
    type DependencyInfo = {
      [name: string]: CodeDependency;
    };

    if (examples?.at(selectedTab)!!.dependencies) {
      return examples?.at(selectedTab)!!.dependencies as DependencyInfo;
    }
    return null;
  };

  const onTabSelect = (index: number) => {
    setSelectedCode("code");
    setSelectedTab(index);
  };

  const makeFieldMap = (client?: ApiClient) => {
    const conf = client && config ? config[client.env.toLowerCase()] : config?.["test"];
    return {
      __CLIENT_ID__: client?.clientId || "<CLIENT-UUID>",
      __SCOPE__: client?.scopes.join(" ") || "<SCOPE:WITHPREFIX>",
      __MASKINPORTEN_URL__: conf?.issuer || "__MASKINPORTEN_URL__",
      __MASKINPORTEN_TOKEN_URL__:
        conf?.token_endpoint || "__MASKINPORTEN_TOKEN_URL__",
      __KID__: client?.keys?.[0].kid || "__KID__",
    };
  };

  const processCode = (codeString: string): string => {
    const client = clients.find((client) => {
      return selectValue?.includes(`${client.env}:${client.clientId}`);
    });

    const fieldMap = makeFieldMap(client);
    Object.entries(fieldMap).forEach(([key, value]) => {
      codeString = codeString.replaceAll(key, value);
    });

    return codeString;
  };

  return (
    <>
      <Heading level={3} spacing size={"large"}>
        Eksempelkode
      </Heading>

      {clients && clients.filter(props.filter).length > 0 && (
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
              <Combobox
                value={selectValue}
                onValueChange={val => setSelectValue(val)}
              >
                <Combobox.Empty>
                  Fant ingen integrasjoner
                </Combobox.Empty>
                {clients.filter(props.filter).map(client => (
                  <Combobox.Option
                    key={`${client.env}:${client.clientId}`}
                    value={`${client.env}:${client.clientId}`}
                    description={`Integrasjons-id: ${client.clientId}`}
                    displayValue={client.clientId}
                  >
                    {`${client.env}: ${client.description}`}
                  </Combobox.Option>
                ))
                }
              </Combobox>
            </div>
          </div>
        </>
      )}
      <div className={styles.codeExampleBox}>
        <div className={styles.codeExampleTabs}>
          {examples &&
            examples.map((example, index) => (
              <button
                key={index}
                className={`${styles.codeExampleTab} ${
                  selectedTab === index ? styles.active : ""
                }`}
                onClick={() => onTabSelect(index)}
              >
                {example.title}
              </button>
            ))}
        </div>
        <div className={styles.codeExampleContent} lang={"en"}>
          {getDependencies() && (
            <ToggleGroup
              className={styles.dependencies}
              size={"small"}
              value={selectedCode}
              onChange={(val) => setSelectedCode(val)}
            >
              <ToggleGroup.Item value={"code"}>Kode</ToggleGroup.Item>
              {Object.values(getDependencies()!!).map((dependency, index) => (
                <ToggleGroup.Item key={index} value={dependency.id}>
                  {(dependency as CodeDependency).name}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
          )}

          {examples && (
            <SyntaxHighlighter
              customStyle={{ backgroundColor: "white" }}
              style={docco}
              showLineNumbers={true}
              wrapLines={false}
              wrapLongLines={false}
              language={
                getDependencies() && selectedCode !== "code"
                  ? getDependencies()!![selectedCode].lang
                  : examples.at(selectedTab)!!.lang
              }
            >
              {getDependencies() && selectedCode !== "code"
                ? getDependencies()!![selectedCode].code.join("\n")
                : processCode(examples.at(selectedTab)!!.code.join("\n"))}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </>
  );
}

export default CodeExample;
