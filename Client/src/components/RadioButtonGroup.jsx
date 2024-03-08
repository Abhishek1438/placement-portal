import classes from "./RadioButtonGroup.module.css";

const RadioButtonGroup = (props) => {
  return (
    <div className={classes.container}>
      <div>
        {props.options.map((option) => (
          <label key={props.category}>
            <input type="radio" name={props.category} value={option} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
