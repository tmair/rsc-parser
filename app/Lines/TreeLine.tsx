import React, {
  ChangeEvent,
  ReactNode,
  Suspense,
  createContext,
  useContext,
  useState,
} from "react";
import { JsonObject, JsonValue } from "type-fest";
import { stringToKiloBytes } from "../stringtoKiloBytes";
import { lexer, parse, splitToCleanLines } from "../parse";
import { ErrorBoundary } from "react-error-boundary";
import { GenericErrorBoundaryFallback } from "../GenericErrorBoundaryFallback";
import { TabContext } from "../TabContext";
import { PayloadContext } from "../PayloadContext";

export const TYPE_OTHER = "TYPE_OTHER";
export const TYPE_COMPONENT = "TYPE_COMPONENT";
export const TYPE_ARRAY = "TYPE_ARRAY";

export function refineRawTreeNode(value: JsonValue) {
  if (!Array.isArray(value) && !(value instanceof Array)) {
    return {
      type: TYPE_OTHER,
      value: value,
    } as const;
  }

  if (
    value.length === 4 &&
    value[0] === "$" &&
    typeof value[1] === "string" &&
    typeof value[3] === "object" &&
    value[3] !== null &&
    !(value[3] instanceof Array)
  ) {
    // eg. ["$","ul",null,{}]
    return {
      type: TYPE_COMPONENT,
      value: [value[0], value[1], value[2], value[3]] as const,
    } as const;
  }

  return {
    type: TYPE_ARRAY,
    value: value,
  } as const;
}

export function TreeLine({ data }: { data: string }) {
  const json = JSON.parse(data);

  return (
    <div className="bg-slate-100">
      <Node value={json} />
    </div>
  );
}

function Node({ value }: { value: JsonValue }) {
  const refinedNode = refineRawTreeNode(value);

  switch (refinedNode.type) {
    case TYPE_OTHER:
      return (
        <ErrorBoundary
          FallbackComponent={GenericErrorBoundaryFallback}
          key={refinedNode.value?.toString()}
        >
          <NodeOther value={refinedNode.value} />
        </ErrorBoundary>
      );
    case TYPE_ARRAY:
      return (
        <ErrorBoundary
          FallbackComponent={GenericErrorBoundaryFallback}
          key={refinedNode.value?.toString()}
        >
          <Suspense>
            <NodeArray values={refinedNode.value} />
          </Suspense>
        </ErrorBoundary>
      );
    case TYPE_COMPONENT: {
      const [reactComponentMarker, tag, unknown, props] = refinedNode.value;

      return (
        <ErrorBoundary
          FallbackComponent={GenericErrorBoundaryFallback}
          key={refinedNode.value?.toString()}
        >
          <NodeComponent tag={tag} props={props} />
        </ErrorBoundary>
      );
    }
  }
}

function JSValue({ value }: { value: JsonValue }) {
  let formattedValue = JSON.stringify(value);

  if (value == null) {
    formattedValue = "null";
  }

  if (value == "$undefined") {
    formattedValue = "undefined";
  }

  return (
    <div className="inline-flex flex-row gap-1.5 items-center bg-yellow-200 rounded-md px-1.5 py-px text-sm">
      <div className="bg-yellow-200 text-yellow-600 rounded font-semibold">
        JS
      </div>
      <pre className="mt-px">{formattedValue}</pre>
    </div>
  );
}

function NodeOther({ value }: { value: JsonValue }) {
  // TODO: handle $undefined in a better way
  if (typeof value !== "string" || value === "$undefined") {
    return <JSValue value={value} />;
  }

  return <span>{value}</span>;
}

export const BackgroundColorLightnessContext = createContext<number>(290);

function NodeArray({ values }: { values: JsonValue[] | readonly JsonValue[] }) {
  const backgroundColorLightness = useContext(BackgroundColorLightnessContext);

  if (values.length == 0) {
    return <>No items</>;
  }

  return (
    <ul className="flex flex-col gap-2 my-2 w-full">
      {values.map((subValue, i) => {
        const refinedSubNode = refineRawTreeNode(subValue);

        return (
          <BackgroundColorLightnessContext.Provider
            key={
              JSON.stringify(refinedSubNode.value) +
              String(i) +
              String(backgroundColorLightness)
            }
            value={backgroundColorLightness - 30}
          >
            <li>
              <Suspense>
                <Node value={refinedSubNode.value} />
              </Suspense>
            </li>
          </BackgroundColorLightnessContext.Provider>
        );
      })}
    </ul>
  );
}

function PropValue({ value }: { value: unknown }) {
  if (typeof value === "string") {
    return <span className="text-yellow-600">&quot;{value}&quot;</span>;
  }

  // The special codes are curly braces
  return (
    <span>
      <span className="text-blue-500">&#123;</span>
      <span className="">{JSON.stringify(value)}</span>
      <span className="text-blue-500">&#125;</span>
    </span>
  );
}

function Prop({ propKey, value }: { propKey: string; value: unknown }) {
  return (
    <>
      <span className="text-green-700">{propKey}</span>
      <span className="text-pink-700">{`=`}</span>
      <PropValue value={value} />
    </>
  );
}

function CodeProps({ props }: { props: JsonObject }) {
  const rootProps = Object.keys(props);

  if (
    rootProps.length === 0 ||
    (rootProps.length === 1 && rootProps[0] === "children")
  ) {
    return null;
  }

  // Only show props inline if there is just one prop
  if (
    rootProps.length === 1 &&
    // Long props should break the line
    String(props[rootProps[0]]).length < 80
  ) {
    return (
      <>
        {" "}
        <Prop propKey={rootProps[0]} value={props[rootProps[0]]} />
      </>
    );
  }

  return (
    <div className="pl-4 flex flex-col">
      {rootProps
        .filter((rootProp) => rootProp !== "children")
        .map((rootProp, i) => {
          return (
            <span key={rootProp}>
              <Prop propKey={rootProp} value={props[rootProp]} />
              {i < rootProps.length - 1 ? " " : null}
            </span>
          );
        })}
    </div>
  );
}

function NodeComponent({ tag, props }: { tag: string; props: JsonObject }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <details
      className="flex flex-col gap-1 w-full"
      open={isOpen}
      onToggle={(event: ChangeEvent<HTMLDetailsElement>) => {
        event.stopPropagation();
        setIsOpen(event.target.open);
      }}
    >
      <summary className="cursor-pointer rounded-lg hover:bg-gray-200 px-2 py-1 -mx-2 -my-1">
        {isOpen ? (
          <>
            <span className="text-purple-500">&lt;</span>
            <span className="text-pink-700">{tag}</span>
            <CodeProps props={props} />
            <span className="text-purple-500">&gt;</span>
          </>
        ) : (
          <>
            <span className="text-purple-500">&lt;</span>
            <span className="text-pink-700">{tag}</span>
            <span className="text-purple-500">&gt;</span>
            <span className="rounded-lg border-1 border-slate-400 border-solid px-1.5 mx-1">
              ⋯
            </span>
            <span className="text-purple-500">&lt;/</span>
            <span className="text-pink-700">{tag}</span>
            <span className="text-purple-500">&gt;</span>
          </>
        )}
      </summary>

      <div className="pl-4 flex flex-col gap-2 items-start">
        <ComponentImportReference tag={tag} />
        <Node value={props.children} />
      </div>

      <div>
        <span className="text-purple-500">&lt;/</span>
        <span className="text-pink-700">{tag}</span>
        <span className="text-purple-500">&gt;</span>
      </div>
    </details>
  );
}

function ComponentImportReference({ tag }: { tag: string }) {
  const tab = useContext(TabContext);
  if (tab === undefined) {
    throw new Error("TabContext must be used within a TabContext.Provder");
  }

  const payload = useContext(PayloadContext);
  if (tab === undefined) {
    throw new Error(
      "PayloadContext must be used within a PayloadContext.Provder"
    );
  }

  if (tag.startsWith("$L")) {
    return (
      <div className="bg-blue-200 rounded-md flex flex-row text-sm p-1">
        <span className="flex flex-row gap-2 px-2 items-center">
          <span className="text-blue-700 font-semibold">INFO</span>
          <span>{tag} indicates an imported componet</span>
        </span>
        <button
          className="text-left bg-blue-800 text-white rounded px-2 py-1"
          onClick={() => {
            if (tag) {
              const buttonIdentifier = tag.replace("$L", "");

              const lines = splitToCleanLines(payload);

              for (const line of lines) {
                const tokens = lexer(line);
                const { identifier } = parse(tokens);

                if (buttonIdentifier === identifier) {
                  tab.setTab(line);
                }
              }
            }
          }}
        >
          Go to &quot;
          {tag.replace("$L", "")}
          &quot;
        </button>
      </div>
    );
  }

  return null;
}
