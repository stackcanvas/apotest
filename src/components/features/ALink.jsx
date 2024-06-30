import Link from "next/link";
import { memo } from "react";

const ALink = ({ href, children, className, onClick }) => {
  function onClickHandler(event) {
    if (href == "#") {
      event.preventDefault();
    }

    if (typeof onClick == "function") {
      onClick();
    }
  }

  return (
    <Link href={href ? href : "#"}>
      <span className={`block ${className}`} onClick={onClickHandler}>
        {children}
      </span>
    </Link>
  );
};

export default memo(ALink);
