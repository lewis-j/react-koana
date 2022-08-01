const BigMacIcon = ({ expand, handleExpand }) => {
    return (
        <div className="bigMacIcon" onClick={() => handleExpand()}>
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
    );
};

export default BigMacIcon;
