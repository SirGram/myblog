
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function HoverCardMarkdownHelp(){
    return(
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">?</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-background">
          <div className="flex">
          <ul className="list-disc pl-4 list-none">
                    <li><code>&amp;nbsp;  Line break</code> </li>
                    <li><code># Heading 1</code> </li>
                    <li><code>## Heading 2</code></li>
                    <li><code>### Heading 3</code> </li>
                    <li><code>- List item</code></li>
                    <li><code>[Link text](url)</code> </li>
                    <li><code>**bold text**</code> </li>
                    <li><code>*italic text*</code></li>
                    <li><code>`code`</code></li>
                    <li><code>```code block```</code></li>
                  </ul>
          </div>
           
        </HoverCardContent>
      </HoverCard>
    )
  }