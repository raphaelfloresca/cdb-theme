import { render } from 'react-dom'
import { useState } from 'react'

// Define an interface for the attributes your block uses
interface FrontendProps {
  noOfButtonClicks: number
}

document.querySelectorAll(".button-block").forEach(div => {
  const buttonClicks = JSON.parse(div.getAttribute('data-no-of-button-clicks') as string);

  render(<CDBButton noOfButtonClicks={buttonClicks} />, div);
});

function CDBButton(props: FrontendProps) {
  console.log(props.noOfButtonClicks)
  const [numOfButtonClicks, setNoOfButtonClicks] = useState(props.noOfButtonClicks)

  function handleClick() {
    setNoOfButtonClicks(no => no + 1)
  }
  return (
    <div>
      <button onClick={handleClick}>Clicked {numOfButtonClicks} times</button>
    </div>
  );
}
