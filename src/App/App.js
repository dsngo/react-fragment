import { Suspense, StrictMode } from "react";
import { Global } from "@emotion/core";
import { useMachine } from "@xstate/react";
import { appMachine, AppCtx } from "./store";
import { appStyles } from "./style";

const App = () => {
  const [state, send] = useMachine(appMachine, { devTools: false });
  const machine = [state, send];

  return (
    <StrictMode>
      <Global styles={appStyles} />
      <AppCtx.Provider value={machine}>
        <Suspense fallback={<div> SUSPENSE </div>}>
          <>
            <div>SOME TEST TEXT</div>
          </>
        </Suspense>
      </AppCtx.Provider>
    </StrictMode>
  );
};

export default App;
