import { MetaProvider, Title } from "@solidjs/meta";
import { Toaster } from "solid-sonner";

function DefaultLayout(props) {
  return (
    <>
      <Toaster richColors position="bottom-center" />
      <MetaProvider>
        <Title>Flagship</Title>
      </MetaProvider>
      {props.children}
    </>
  );
}

export default DefaultLayout;
