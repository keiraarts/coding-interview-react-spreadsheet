import { useState, useCallback, useReducer } from "react";
import { Frame, Card, Form, FormLayout, TextField, Button, Toast } from "@shopify/polaris";

function hasJsonStructure(jsonString) {
  try {
    let o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {}

  return false;
}

function reducer(state, action) {
  switch (action.type) {
    case "ERROR":
      return { ...state, active: true, message: "Could not load", error: true };
    case "ACCEPT":
      useCallback(() => setActive(active => !active), []);
      return { ...state, active: true, message: "Data saved", error: false };
    case "CLEANUP":
      return { ...state, active: false };
    default:
      throw new Error();
  }
}

function AppForm() {
  // JSON data input
  const [data, setData] = useState("[[1], [2, 3], [4, 5, 6], [], [7, 8, 9, 0]]");
  const handleDataChange = useCallback(value => setData(value), []);
  // Toast dispatcher
  // TODO: Reducer seems overkill, but easily extendible
  const [toast, dispatch] = useReducer(reducer, { active: false, message: "Parsing data", error: false });

  const handleSubmit = useCallback(() => {
    // Prevent form from accepting non-json data types
    // TODO: Accept stringified json?
    const dataStructure = hasJsonStructure(data);
    // Terminate function if the data isn't valid.
    if (!dataStructure) {
      dispatch({ type: "ERROR" });
      setData("");
      return;
    }
  }, [data]);

  const toastMarkup = toast.active ? <Toast content={toast.message} onDismiss={toast.active} error={toast.error} /> : null;

  return (
    <Frame>
      <Card sectioned>
        {toastMarkup}
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField value={data} onChange={handleDataChange} label='Data key' helpText={<span>Per instructions, this form only supports json.</span>} />

            <Button submit primary>
              Load Data
            </Button>
          </FormLayout>
        </Form>
      </Card>
    </Frame>
  );
}

export default AppForm;