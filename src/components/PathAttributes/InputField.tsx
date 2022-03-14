import { useStoreMap } from "effector-react";
import { createEvent, createEffect, sample } from "effector";

const InputField = ({ $store, name, type, label }) => {
  const sendFormFx = createEffect((params) => {
    console.log(params);
  });
  const onChange = createEvent();
  const setField = createEvent();
  $store.on(setField, (s, { key, value }) => {
    return {
      ...s,
      [key]: value,
    };
  });

  sample({ clock: onChange, source: $store });

  const handleChange = setField.prepend((e) => {
    console.log($store.getState());
    return {
      key: e.target.name,
      value: e.target.value,
    };
  });

  const value = useStoreMap({
    store: $store, // take $form's state
    keys: [name], // watch for changes of `name`
    fn: (values) => {
      return values[name] || "";
    }, // retrieve data from $form's state in this way (note: there will be an error, if undefined is returned)
  });

  return (
    <div>
      {label}{" "}
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleChange /* note, bound event is here! */}
      />
    </div>
  );
};
export default React.memo(InputField);
