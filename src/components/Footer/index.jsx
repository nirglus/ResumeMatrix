import "./Footer.css";
import { currentYear } from "../../helpers/dates";

function Footer() {
  return (
    <footer>
      <div className="topFooter">
        <div className="company">
          <h2>ResumeMatrix</h2>
          <p>Your pal for effortless resumes!<br/>Simplifying resume creation with ResumeMatrix</p>
        </div>
        <div className="products">
          <h2>Products</h2>
          <a href="https://nirglus.github.io/Movies-Project/html/index.html">MovieNatic</a>
          <a href="https://cryptonight-e657d.web.app/">CryptNight</a>
          <a href="https://budget-tracker-9040e.web.app/">BudgetBuddy</a>
        </div>
      </div>
      <div className="bottomFooter">
        <div className="copyright">
          <p>© {currentYear}  ResumeMatrix: All rights reserved</p>
        </div>
        <div className="icons">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-whatsapp"></i>
          <a href="https://github.com/nirglus"><i className="bi bi-github"></i></a>
          <i className="bi bi-envelope-at-fill"></i>
        </div>
      </div>
    </footer>
  )
}

export default Footer
