import { ReactNode } from "react";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function ButtonWithIcon({ children }: { children: ReactNode }) {
  return (
    <button className="rounded-full text-foreground bg-background border-2 w-fit p-2 hover:bg-accent hover:border-ring ">
      {children}
    </button>
  );
}

export default function SocialMedia() {
  return (
    <div className="md:fixed bottom-3 left-3 p-2 bg-muted rounded-full border-2 border-secondary">
      <ul className="flex  text-2xl">
        <li className="border-background border-r-2 pr-2">
          {" "}
          <ButtonWithIcon>
            <FaTwitter />
          </ButtonWithIcon>
        </li>
        <li className="border-background border-r-2 px-2">
          {" "}
          <ButtonWithIcon>
            <FaLinkedinIn />
          </ButtonWithIcon>
        </li>
        <li className=" pl-2">
          {" "}
          <ButtonWithIcon>
            <FaInstagram />
          </ButtonWithIcon>
        </li>
      </ul>
    </div>
  );
}
