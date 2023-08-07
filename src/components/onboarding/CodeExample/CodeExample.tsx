import React, {ReactNode, useState} from "react";
import styles from "./styles.module.scss";
import {useClients} from "../../../hooks/api";
import {Heading, Paragraph, Select} from "@digdir/design-system-react";
import CodeLanguage from "./CodeLanguage";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {bold} from "../../util/textTransforms";
import { KeyHorizontalIcon, ClipboardIcon, BranchingIcon } from '@navikt/aksel-icons';
import {ApiClient} from "../../../types/api";

interface Props {
    title: string;
    children: ReactNode[] | ReactNode;
}

function CodeExample(props: Props) {
    const { data: testClients } = useClients("test");
    const { data: prodClients } = useClients("ver2");
    const [ selectValue, setSelectValue] = useState<string>();
    const [ selectedTab, setSelectedTab ] = useState(0);

    const formatLabel = (client: ApiClient, env: string) => (
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
                {env}
            </span>
        </div>
    );

    const testClient_ids = testClients?.map(client => {
        return {value: "TEST:" + client.clientId, label: client.clientId, formattedLabel: formatLabel(client, "test")}
    });
    const prodClient_ids = prodClients?.map(client => {
        return {value: "PROD:" + client.clientId, label: client.clientId, formattedLabel: formatLabel(client, "ver2")}
    });
    const client_ids = testClient_ids && prodClient_ids && testClient_ids.concat(prodClient_ids);

    const examples =  React.Children.map(props.children, child => {
        if (React.isValidElement(child) && (child as React.ReactElement<any>).type === CodeLanguage) {
            return {title: child.props.title, lang: child.props.language, code: child.props.code};
        }
    });

    const processCode = (codeString: string): string => {

        if (selectValue && testClients && prodClients) {
            const clients = testClients.concat(prodClients);
            let client = clients.find((client) => {
                return selectValue.split(":")[1] === client.clientId;
            });

            let s = codeString.replaceAll("__CLIENT_ID__", client!!.clientId)
                .replaceAll("__SCOPE__", client!!.scopes.join(" ,"));
            return s

        } else {
            let s = codeString.replaceAll("__CLIENT_ID__", "client-uuid")
                .replaceAll("__SCOPE__", "scope:withprefix");
            return s;
        }


    }

    return (
        <>
            <Heading size={"large"}>
                {props.title}
            </Heading>

            {client_ids && (
                <>
                    <Paragraph>
                        Ved å legge inn hvilken tilgang du skal ta i bruk kan vi gi deg kodeeksempler som du kan bruke.
                    </Paragraph>
                    <div>
                        <Heading className={styles.smallHeading} size={"small"}>
                            Hvilken tilgang skal du ta i bruk?
                        </Heading>
                        <div className={styles.selectionContainer}>
                            <Select value={selectValue}
                                    options={client_ids}
                                    onChange={(value) => setSelectValue(value)} />
                        </div>
                    </div>
                </>

            )}
            <Heading className={styles.smallHeading} size={"small"}>
                Kode-eksempel:
            </Heading>
            <div className={styles.codeExampleBox}>
                <div className={styles.codeExampleTabs}>
                    {examples && examples.map((example, index) => (
                        <span key={index}
                              className={selectedTab === index ? styles.active : ""}
                              onClick={() => setSelectedTab(index)}>
                            {example.title}
                        </span>
                    ))}
                </div>
                <div className={styles.codeExampleContent}>
                    {examples &&
                        <SyntaxHighlighter customStyle={{backgroundColor: "white"}}
                                           style={docco}
                                           showLineNumbers={true}
                                           wrapLines={false}
                                           wrapLongLines={false}
                                           language={examples.at(selectedTab)!!.lang}>
                            {processCode(examples.at(selectedTab)!!.code.join("\n"))}
                        </SyntaxHighlighter>
                    }
                </div>
            </div>
        </>
    );




}

export default CodeExample;