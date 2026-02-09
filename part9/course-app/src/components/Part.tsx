import type { PartProps } from "../types"

const Part = ({courseParts}: PartProps) => {

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
  <div> {courseParts.map(part => {
    const basics = <p><b>{part.name}</b>: {''}{part.exerciseCount}</p>
    switch(part.kind) {
      case "basic":
        return <div key={part.name}>
          {basics}
          <p><i>{part.description}</i></p>
          </div>
      case "group":
        return <div key={part.name}>
          {basics}
          <p>Group project members: {part.groupProjectCount}</p>
          </div>
      case "background":
        return <div key={part.name}>
          {basics}
          <p><i>{part.description}</i></p>
          <p>{part.backgroundMaterial}</p>
        </div>
      case "special":
        const requirementsAsString = part.requirements.join(', ')
        return <div key={part.name}>
          {basics}
            <p><i>{part.description}</i></p>
            <p>Required skills: {requirementsAsString}</p> 
          </div>
        default:
          return assertNever(part);
    }

  })}
  </div>
)
}

export default Part;