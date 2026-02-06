import type { ContentProps, CoursePart } from "../types"

const Content = ({courseParts}: ContentProps) => {

return (
<div>
  {courseParts.map((course: CoursePart) => <p key={course.name}>{course.name} {course.exerciseCount}</p>)}
</div>
)
}

export default Content;