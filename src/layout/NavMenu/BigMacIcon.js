import { koana_logo } from "../../assets/images/icons";
import { useNavigate } from "react-router-dom";

const BigMacIcon = ({ expand, handleExpand }) => {
  const navigate = useNavigate();

  const burgerCollapsedKoanaIcon = (
    <div key={"koanaIcon"} className="burgerCollapsedKoanaIcon">
      <img
        onClick={() => {
          navigate(`/`);
        }}
        src={koana_logo}
        alt="logo"
      />
    </div>
  );

  return (
    <>
      <div className="bigMacMode">
        <div
          className="bigMacIcon"
          onClick={(e) => {
            e.stopPropagation();
            handleExpand();
          }}
        >
          {expand ? (
            <>
              <div className="burgerSpacer"></div>
              <div className="burger burgerFade"></div>
              <div className="burger burgerExpand"></div>
              <div className="burger burgerFade"></div>
            </>
          ) : (
            <>
              <div className="burgerSpacer"></div>
              <div className="burger"></div>
              <div className="burger"></div>
              <div className="burger"></div>
            </>
          )}
        </div>
        {!expand && <div>{burgerCollapsedKoanaIcon}</div>}
      </div>
    </>
  );
};

export default BigMacIcon;
