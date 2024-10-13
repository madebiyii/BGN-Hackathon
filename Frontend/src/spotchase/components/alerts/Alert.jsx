import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

// Alert component used for notifications

export default function Alert(props) {
  const { list, type, message, link, linkText, handleClick } = props;

  const isTop = props.isTop ?? false;
  const position = isTop ? "top-2" : "bottom-2";

  // Get type of alert based on the props
  const getProps = () => {
    switch (type) {
      case "error":
        return {
          icon: <XCircleIcon className="h-5 w-5 text-red-400" />,
          bgColor: "bg-red-50",
          textColor: "text-danger",
          headingColor: "text-red-800",
          hoverTextColor: "hover:text-red-600",
        };
      case "success":
        return {
          icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          headingColor: "text-green-800",
          hoverTextColor: "hover:text-green-600",
        };
      case "warning":
        return {
          icon: <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" />,
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          headingColor: "text-yellow-800",
          hoverTextColor: "hover:text-yellow-600",
        };
      default:
        return {
          icon: <InformationCircleIcon className="h-5 w-5 text-blue-400" />,
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          headingColor: "text-blue-800",
          hoverTextColor: "hover:text-blue-600",
        };
    }
  };
  const { icon, bgColor, textColor, headingColor, hoverTextColor } = getProps();

  return (
    <div
      role={handleClick ? "button" : "alert"}
      onClick={handleClick ? handleClick : () => void 0}
      className={`right-1/8 fixed z-[1000] w-full drop-shadow-xl md:right-1/4 md:w-1/2 ${position}`}
    >
      <div data-cy="alert" className={`rounded-3xl p-4 ${bgColor}`}>
        <div className="flex">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium ${headingColor}`}>{message}</h3>
            {list && (
              <div className={`mt-2 text-sm ${textColor}`}>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Your password must be at least 8 characters</li>
                  <li>
                    Your password must include at least one pro wrestling
                    finishing move
                  </li>
                </ul>
              </div>
            )}
            {link && linkText && (
              <div className="bold mt-2 text-sm underline">
                <a
                  href={link}
                  className={`font-medium underline ${textColor} ${hoverTextColor}`}
                >
                  {linkText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
