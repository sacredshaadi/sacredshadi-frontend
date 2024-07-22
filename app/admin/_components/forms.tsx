import { Fragment } from "react";
import { InputProps, Input } from "@/components/ui/input";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";
import { SwitchProps } from "@radix-ui/react-switch";
import { FormLabel, FormLabelProps } from "@/components/ui/label";

export type SupportedWidgets =
  | { name: "input"; props: InputProps }
  | { name: "textAreaInput"; props: TextareaProps }
  | { name: "toggleInput"; props: SwitchProps }
  | { name: "label"; props: FormLabelProps };

export type SupportedWidgetNames = SupportedWidgets["name"];

export type FormElementInstance = SupportedWidgets & {
  id: string | number;
};

export const widgetMap: Record<SupportedWidgetNames, FC<any>> = {
  input: Input,
  textAreaInput: Textarea,
  toggleInput: Switch,
  label: FormLabel
};

export function FormRenderer(props: { meta: FormElementInstance[] }) {
  return (
    <Fragment>
      {props.meta.map((item) => {
        const Widget = widgetMap[item.name];
        if (!Widget) return null;
        return <Widget key={item.id} {...item.props} />;
      })}
    </Fragment>
  );
}
