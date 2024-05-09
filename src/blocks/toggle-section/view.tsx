import { render } from 'react-dom'
import { useState, useEffect, useRef } from '@wordpress/element'
import { Switch } from "@/src/components/ui/switch"
import DOMPurify from "dompurify"

// Define an interface for the attributes your block uses
interface FrontendProps {
  sectionToggle: boolean,
  content: string,
}

document.querySelectorAll(".toggle-section-block").forEach(div => {
  const sectionToggle = JSON.parse(div.getAttribute('data-section-toggle') as string);
  const sectionToggleBoolean = sectionToggle === "false" ? false : Boolean(sectionToggle)
  const content = JSON.parse(div.getAttribute('data-content') as string);

  // render(<CDBToggleSection sectionToggle={sectionToggle} content={content} />, div);
  render(<CDBToggleSection sectionToggle={sectionToggleBoolean} content={content} />, div);
});

function CDBToggleSection(props: FrontendProps) {
  const [sectionToggle, setSectionToggle] = useState(props.sectionToggle)
  const sanitizedHTMLContent = DOMPurify.sanitize(props.content)

  useEffect(() => {
    const modifiedHTMLContent = applyClassesToDivs(sanitizedHTMLContent, sectionToggle);
    document.getElementById('rendered-content')!.innerHTML = modifiedHTMLContent;
  }, [sectionToggle, sanitizedHTMLContent]);

  const applyClassesToDivs = (htmlContent: string, toggleState: boolean) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const divs = doc.querySelectorAll('div');

    divs.forEach((div, index) => {
      if ((toggleState && index === 0) || (!toggleState && index === 1)) {
        div.classList.add('hidden');
      } else {
        div.classList.remove('hidden');
      }
    });

    return doc.body.innerHTML;
  };

  return (
    <div>
      <Switch id="section-switch" checked={sectionToggle} onCheckedChange={() => setSectionToggle(toggle => !toggle)} />
      <div id="rendered-content" />
    </div>
  );
}
