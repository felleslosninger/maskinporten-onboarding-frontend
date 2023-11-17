interface Props {
  title: string;
  language: string;
  dependencies?: {
    [name: string]: CodeDependency;
  };
  code: string[];
}

export interface CodeDependency {
  lang: string;
  code: string[];
  name: string;
  id: string;
}

function CodeLanguage(props: Props) {
  return null;
}

export default CodeLanguage;
