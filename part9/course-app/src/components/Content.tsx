import type { CoursePart } from "../types"

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {

return (
<div>
  {courseParts.map((course: CoursePart) => <p key={course.name}>{course.name} {course.exerciseCount}</p>)}
</div>
)
}

export default Content;