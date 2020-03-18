import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const LoadingComponents: React.FC<{
  inverted?: true;
  content?: string;
}> = (inverted, content) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};
