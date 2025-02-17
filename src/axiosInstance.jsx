import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_CAPTCHA_API_KEY;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 405) {
      console.warn('Captcha requis par AWS WAF.');
      handleCaptchaChallenge();
    }
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.request.use(
  (request) => {
    return window.AwsWafIntegration?.getToken().then((token) => {
      request.headers["x-aws-waf-token"] = token;
      return request;
    });
  },
  (_) => Promise.reject(_)
)

function handleCaptchaChallenge() {
  renderCaptcha().then(() => {
    return axiosInstance.request();
  });
}

function renderCaptcha(
  onCaptchaEvent = (event) => console.log(event)
) {
  document.body.style.cursor = "wait";
  document.getElementById("modalOverlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
  
  return new Promise((resolve) => {
    window.AwsWafCaptcha?.renderCaptcha(
      document.getElementById("captchaForm"),
      {
        onSuccess: (wafToken) => {
          document.getElementById("modalOverlay").style.display = "none";
          document.getElementById("modal").style.display = "none";
          console.log("On success");
          onCaptchaEvent("onSuccess");
          resolve(wafToken);
        },
        onLoad: () => {
          document.body.style.cursor = "default";
          onCaptchaEvent("onLoad");
          
        },
        onError: () => onCaptchaEvent("onError"),
        onPuzzleTimeout: () => onCaptchaEvent("onPuzzleTimeout"),
        onPuzzleIncorrect: () => onCaptchaEvent("onPuzzleIncorrect"),
        onPuzzleCorrect: () => onCaptchaEvent("onPuzzleCorrect"),

        apiKey: API_KEY,
      }
    );
  });
}

export default axiosInstance;
