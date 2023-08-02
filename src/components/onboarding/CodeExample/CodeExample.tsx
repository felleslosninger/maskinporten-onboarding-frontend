import React, {ReactNode, useState} from "react";
import styles from "./styles.module.scss";
import {useClients} from "../../../hooks/api";
import {Heading, Select} from "@digdir/design-system-react";
import CodeLanguage from "./CodeLanguage";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Props {
    children: ReactNode[] | ReactNode;
}

function CodeExample(props: Props) {
    const { data } = useClients();
    const [ selectValue, setSelectValue] = useState<string>();
    const [ selectedTab, setSelectedTab ] = useState(0);
    const client_ids = data?.map(client => {
        return {value: client.clientId, label: client.description}
    });

    const examples =  React.Children.map(props.children, child => {
        if (React.isValidElement(child) && (child as React.ReactElement<any>).type === CodeLanguage) {
            return {title: child.props.title, lang: child.props.language, code: child.props.code};
        }
    });

    const processCode = (codeString: string): string => {

        if (selectValue && data) {
            let client = data.find((client) => {
                return selectValue == client.clientId;
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
            {client_ids && (
                <div>
                    <Heading className={styles.smallHeading} size={"small"}>
                        Hvilken tilgang skal du ta i bruk?
                    </Heading>
                    <div className={styles.selectionContainer}>
                        <Select options={client_ids} onChange={(value) => setSelectValue(value)} />
                    </div>
                </div>
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