import type { ContentProps } from "../types"
import Part from "./Part";

const Content = ({courseParts}: ContentProps) => {

return (
<div>
 <Part courseParts={courseParts}/>
</div>
)
}

export default Content;