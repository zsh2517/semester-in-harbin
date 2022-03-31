// (c) 2022 mahoshojoHCG
// This code is licensed under MIT license (see LICENSE.MIT for details)
// Thirdparty:
// React: MIT License see https://github.com/facebook/react/blob/main/LICENSE
import React from "https://esm.sh/react@17.0.2";
import ReactDOM from "https://esm.sh/react-dom@17.0.2";

const status = await (await fetch("status.json")).json();

const Header = (props) => (
  <div className="item item-title">
    <div style={{ fontWeight: "bold", display: "inline-block" }}>
      #今天学校解封了吗？
    </div>
    <div style={{ display: "inline-block" }}>{props.overall}</div>
  </div>
);

const Example = () => (
  <div className="item" style={{ textAlign: "center" }}>
    <div style={{ fontSize: "x-large" }}>图例</div>
    <div style={{ display: "flex" }}>
      <div className="item status-open">好耶，解封了！</div>
      <div className="item status-clse">还在封校...</div>
      <div className="item status-test">核酸检测，捅嗓子 ++</div>
    </div>
    <div className="risk-item risk-low">地区全域低风险</div>
    <div className="risk-item risk-medium">地区内存在中风险</div>
    <div className="risk-item risk-high">地区内存在高风险</div>
  </div>
);

const Footer = (prop) => (
  <>
    <div style={{ fontSize: "small" }}>
      *
      参考链接来自公众号【哈尔滨市政府网】。风险情况从3月1日开始记录，地区风险数据来自【国务院客户端】，如当天发生变化，可能会是变动之前或者之后的记录
    </div>
    <div style={{ fontSize: "small" }}>
      *
      关于风险标注，无特殊情况下仅标注我所在的地方（南岗区）和非低风险地区。标注表示该区域内存在中或高风险的地区
    </div>
    <div style={{ fontSize: "small" }}>* 数据更新: {prop.updated}</div>
    <div style={{ fontSize: "small" }}>
      * GitHub:
      <a href="https://github.com/zsh2517/semester-in-harbin">
        zsh2517/semester-in-harbin
      </a>
    </div>
  </>
);

const RiskLow = (props) => (
  <>
    <div class="risk-item risk-low">{props.name}</div>{" "}
  </>
);
const RiskMedium = (props) => (
  <>
    <div class="risk-item risk-medium">{props.name}</div>{" "}
  </>
);
const RiskHigh = (props) => (
  <>
    <div class="risk-item risk-high">{props.name}</div>{" "}
  </>
);

const getClassNameByStatus = (status) => {
  switch (status) {
    case "test":
      return "item status-test";
    case "close":
      return "item status-clse";
    default:
      return "item status-open";
  }
};

const Details = (props) => {
  const links = props.links
    ? props.links.map((val) => (
        <>
          <a href={val.link}>{val.text}</a>{" "}
        </>
      ))
    : [];

  const riskLow = props.risksLow
    ? props.risksLow.map((val) => <RiskLow name={val} />)
    : [];

  const riskMedium = props.risksMedium
    ? props.risksMedium.map((val) => <RiskMedium name={val} />)
    : [];

    const riskHigh = props.risksHigh
    ? props.risksHigh.map((val) => <RiskHigh name={val} />)
    : [];

  const className = getClassNameByStatus(props.status);
  return (
    <div className={className}>
      {props.date}
      <div className="item-comment">
        {props.describe}
        {links}
        {riskLow}
        {riskMedium}
        {riskHigh}
      </div>
    </div>
  );
};

const Month = (props) => {
  const details = props.items.map((val) => <Details {...val} />);
  return (
    <div class="container-month">
      <div class="item item-month">{props.month}</div>
      {details}
    </div>
  );
};

const month = status.data.map((val) => <Month {...val} />);

let description;
switch(status.data[0].items[0].status) {
  case "test":
      description = "没有，核酸 +1";
      break;
    case "close":
      description = "没有，封校 ing";
      break;
    default:
      description = "好耶，解封了！";
      break;
}

ReactDOM.render(
  <>
    <Header overall={description} />
    {month}
    <Example />
    <Footer updated={status.lastUpdated} />
  </>,
  document.getElementById("root")
);
