import { createPortal } from "react-dom";

function AWSWAFCaptchaModal() {

  return createPortal(
    <div className="overlay" id="modalOverlay">
      <div className="modal" id="modal">
        <div id="captchaForm" />
      </div>
    </div>,
    document.body
  );
}

export default AWSWAFCaptchaModal;