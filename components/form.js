import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Form = ({ name, inputs, submit }) => {
  return (
    <>
      <h1>{name}</h1>
      <form action="#">
        {inputs.map((input) => {
          return (
            <TextField
              key={input.name}
              type={input.type}
              name={input.name}
              id={input.name}
              onChange={(e) => input.onChange(e.target.value)}
              value={input.value}
              autoComplete={input.autoComplete}
              label={input.name}
            />
          );
        })}
        <Button type="submit" variant="contained" onClick={submit}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;
