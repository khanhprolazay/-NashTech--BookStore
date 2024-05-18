import { createPortal } from "react-dom";
import "./term-and-condition.popup.css";
import React from "react";

export type PopupHandle = {
	open: () => void;
	close: () => void;
};

type Props = {};

const TermAndConditionPopup = React.forwardRef<PopupHandle, Props>(
	(_props, ref) => {
		const triggerClose = (
			e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) => {
			e.preventDefault();
			close();
		};

		const close = () => {
			const popup = document.getElementById("term-popup");
			popup?.classList.add("popup-hidden");
			popup?.classList.remove("popup-show");
			setTimeout(() => {
				popup?.classList.remove("popup-hidden");
			}, 500);
		};

		const open = () => {
			const popup = document.getElementById("term-popup");
			popup?.classList.add("popup-show");
			popup?.classList.remove("popup-hidden");
		};

		React.useImperativeHandle(ref, () => ({ open, close }));

		return createPortal((
			<div id="term-popup" className="popup-wrapper" onClick={close}>
				<div className="popup-container" onClick={(e) => e.stopPropagation()}>
					<div className="popup-header">
						<h1>Terms and conditions</h1>
					</div>
					<div className="popup-body">
						<div className="policy">
							<h5>
								<i>Ngày cập nhật cuối cùng: 1 tháng 8, 2023</i>
							</h5>
							<h3>Giới thiệu</h3>
							<p>
								Công ty TNHH On Hand BI (OHBI) hiểu rằng, khách hàng sử dụng
								dịch vụ tại OHBI, khách truy cập, những người đang sử dụng (sau
								đây gọi chung là “khách hàng” hay “quý khách”), đều coi trọng
								quyền riêng tư. Quý khách xin vui lòng đọc Chính sách bảo mật
								dưới đây để hiểu hơn những cam kết mà chúng tôi thực hiện nhằm
								tôn trọng và bảo vệ quyền lợi của bạn.
							</p>
							<p>
								Chính sách bảo mật thông tin sẽ giải thích cách chúng tôi tiếp
								nhận, sử dụng và (trong trường hợp nào đó) tiết lộ thông tin cá
								nhân của bạn. Chính sách cũng sẽ giải thích các bước chúng tôi
								thực hiện để bảo mật thông tin cá nhân của khách hàng. Cuối
								cùng, chính sách bảo mật sẽ giải thích quyền lựa chọn của bạn về
								việc thu thập, sử dụng và tiết lộ thông tin cá nhân của mình.
							</p>
							<p>
								Chính sách bảo mật dữ liệu báo cáo sẽ giải thích cách chúng tôi
								bảo mật dữ liệu báo cáo của bạn.
							</p>
							<p>
								Người dùng lưu ý thường xuyên kiểm tra lại để có các bản cập
								nhật cho Chính sách bảo mật này.
							</p>
							<h3>A. Chính sách bảo mật thông tin</h3>
							<h4>I. Thông tin thu thập từ quý khách</h4>
							<p>
								Chúng tôi muốn bạn hiểu rõ các loại thông tin mà chúng tôi thu
								thập khi bạn sử dụng dịch vụ của chúng tôi:
							</p>
							<h4>1. Thông tin cá nhân</h4>
							<p>
								Trong chính sách bảo mật này, "thông tin cá nhân" được hiểu bao
								gồm tên của bạn, tên người dùng, địa chỉ, địa chỉ email, số điện
								thoại, ảnh đại diện hay bất kỳ thông tin cá nhân nào khác mà bạn
								cung cấp, hoặc bất kỳ thông tin nào về bạn được thu thập theo
								chính sách của chúng tôi phù hợp với quy định của pháp luật hiện
								hành.
							</p>
							<p>
								Tất cả nội dung bạn xem được trên trang web nhằm phục vụ nhu cầu
								của bạn, giúp bạn lựa chọn dịch vụ. Bạn sử dụng trang web mà
								không cần cung cấp bất kỳ thông tin cá nhân nào. Tuy nhiên,
								trong một số trường hợp, khi liên quan đến việc đăng ký dịch vụ,
								chúng tôi có thể yêu cầu bạn cung cấp thông tin cá nhân.
							</p>
							<h4>2. Thông tin khác</h4>
							<h5>
								2.1 Thông tin do Quý khách cung cấp khi truy cập hoặc sử dụng
								sản phẩm, dịch vụ trên trang web của chúng tôi
							</h5>
							<p>
								Một số Dịch vụ của chúng tôi yêu cầu người dùng thiết lập các
								Token hoặc cung cấp dữ liệu. Để kết nối sử dụng các Dịch vụ này,
								chúng tôi có thể yêu cầu bạn cung cấp thông tin nhất định về về
								Token/dữ liệu để thiết lập.
							</p>
							<p>
								Khi cung cấp thông tin cho chúng tôi qua trang web này, bạn hiểu
								rõ và chấp thuận việc thu thập, sử dụng và tiết lộ những thông
								tin này theo những điều khoản và điều kiện của chính sách bảo
								mật thông tin này.
							</p>
							<p>
								Bạn hoàn toàn đồng ý và chấp thuận rằng những thông tin khác do
								bạn cung cấp trên trang web có thể được bảo lưu tại trụ sở hay
								văn phòng của chúng tôi, và/hoặc thông tin này có thể được lưu
								trữ tại một số máy chủ hiện có hay chưa biết trước cho mục đích
								vận hành và phát triển trang web cũng như các dịch vụ của chúng
								tôi.
							</p>
							<h5>
								2.2 Thông tin mà chúng tôi thu thập trong quá trình bạn sử dụng
								dịch vụ
							</h5>
							<p>
								Chúng tôi thu thập thông tin về các dịch vụ mà bạn sử dụng và
								cách sử dụng của bạn. Thông tin này bao gồm:
							</p>
							<ul style={{ paddingLeft: "50px" }}>
								<li>
									<strong>Thông tin thiết bị</strong> - chẳng hạn như kiểu phần
									cứng, số IMEI và các nhận dạng thiết bị duy nhất khác, địa chỉ
									MAC, địa chỉ IP, phiên bản hệ điều hành và cài đặt của thiết
									bị mà bạn sử dụng để truy cập Dịch vụ.
								</li>
								<li>
									<strong>Thông tin nhật ký đăng nhập</strong> - chẳng hạn như
									thời gian và thời lượng bạn sử dụng Dịch vụ, cụm từ truy vấn
									tìm kiếm bạn nhập thông qua các Dịch vụ và bất kỳ thông tin
									nào khác được lưu trữ trong cookie mà chúng tôi đã đặt trên
									thiết bị của bạn.
								</li>
								<li>
									<strong>Thông tin địa điểm</strong> - chẳng hạn như tín hiệu
									GPS của thiết bị hoặc thông tin về điểm truy cập WiFi ở gần và
									tháp phát sóng di động có thể được truyền đến chúng tôi khi
									bạn sử dụng những Dịch vụ nhất định.
								</li>
							</ul>

							<h4>II. Về việc thu thập dữ liệu người dùng</h4>
							<p>
								Việc chúng tôi thu thập thông tin cá nhân của khách hàng đều
								tuân thủ theo các quy định của
								<a
									target="_blank"
									className="rule__ref"
									href="https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=95908&Keyword=Lu%E1%BA%ADt%20An%20to%C3%A0n%20th%C3%B4ng%20tin%20m%E1%BA%A1ng">
									{" "}Luật An toàn thông tin mạng 86/2015/QH13 {" "}
								</a>
								ngày 19/11/2015 và Nghị định 85/2021/NĐ-CP Nghị định sửa đổi, bổ
								sung một số điều của
								<a
									target="_blank"
									className="rule__ref"
									href="https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=150735&Keyword=52/2013/N%C4%90-CP">
									{" "}Nghị định số 52/2013/NĐ-CP{" "}
								</a>
								ngày 16 tháng 5 năm 2013 của Chính phủ về thương mại điện tử.
								Chúng tôi sử dụng thông tin thông tin bạn cho những mục đích
								sau:
							</p>
							<ul>
								<li>Xác minh danh tính của người sử dụng sản phẩm, dịch vụ.</li>
								<li>
									Liên hệ trao đổi với người dùng thông tin về sản phẩm, dịch vụ
									mà trang web chúng tôi cung cấp.
								</li>
								<li>
									Gửi thông tin cho bạn về chính sách, dịch vụ của chúng tôi
									cũng như những thay đổi về chính sách, dịch vụ hay thông tin
									khuyến mại.
								</li>
								<li>
									Thực hiện giao dịch thanh toán, gửi các thông báo trong quá
									trình giao dịch, xác nhận thanh toán.
								</li>
								<li>
									Cung cấp các dịch vụ hỗ trợ và chăm sóc khách hàng. Nâng cấp
									dịch vụ của chúng tôi; Xử lý khiếu nại, thu phí, giải quyết sự
									cố, tranh chấp, khiếu nại phát sinh.
								</li>
								<li>
									Cho phép bạn sử dụng thông tin cá nhân liên hệ và được liên hệ
									với những người dùng khác thông qua các trang web, trang web
									có liên quan cho phép.
								</li>
								<li>
									Sử dụng thông tin cá nhân của bạn cho mục đích nghiên cứu các
									hoạt động nội bộ của chúng tôi, như phân tích và quản lý các
									hoạt động kinh doanh, nghiên cứu thị trường, kiểm tra, phát
									triển các sản phẩm, dịch vụ của chúng tôi, xác định các xu
									hướng sử dụng, xác định hiệu quả chiến lược quảng cáo, khuyến
									mại, kết quả thử nghiệm sản phẩm, dịch vụ và những mục đích
									kinh doanh khác phù hợp với quy định của pháp luật hiện hành
									với điều kiện đảm bảo bảo mật thông tin của bạn.
								</li>
								<li>
									Chúng tôi có thể liên kết với một số đơn vị khác – đối tác của
									chúng tôi để cung cấp sản phẩm hay dịch vụ cho bạn. Lúc đó,
									chúng tôi cần và sẽ trao đổi, cung cấp thông tin cá nhân của
									bạn đến các đơn vị này để họ hoàn thành yêu cầu của bạn. Những
									đơn vị này cũng không được phép sử dụng thông tin cá nhân của
									bạn cho các mục đích khác và tuân theo quy định bảo mật khi
									tiến hành cung cấp sản phẩm, dịch vụ cho bạn. Việc các đối tác
									này tự ý sử dụng thông tin cá nhân của bạn một cách trái phép
									mà việc sử dụng thông tin này không thuộc phạm vi kiểm soát
									của chúng tôi, chúng tôi sẽ không thể chịu trách nhiệm trong
									trường hợp này. Tuy nhiên, chúng tôi luôn cố gắng hết sức để
									đảm bảo thông tin của bạn được bảo mật trong khả năng quyền
									hạn của chúng tôi.
								</li>
								<li>Chúng tôi sử dụng cookies của trình duyệt để:</li>
								<ul style={{ paddingLeft: "50px" }}>
									<li>
										Ghi nhớ thông tin đăng nhập để bạn sẽ không phải nhập lại nó
										trong lần truy cập tới của bạn vào dịch vụ OHBI
									</li>
									<li>Cung cấp tùy chỉnh, nội dung cá nhân và thông tin;</li>
									<li>
										Giám sát hiệu quả của các chiến dịch tiếp thị của chúng tôi;
									</li>
									<li>
										Giám sát số liệu tổng hợp như tổng số khách truy cập và lưu
										lượng truy cập;
									</li>
									<li>
										Chẩn đoán hoặc sửa chữa các vấn đề kỹ thuật được báo cáo bởi
										người sử dụng hoặc các nhân viên của chúng tôi;
									</li>
									<li>Truy vấn thông tin của bạn sau khi bạn đăng nhập.</li>
								</ul>
							</ul>

							<h4>III. Lưu trữ thông tin cá nhân</h4>
							<p>Thông tin cá nhân của bạn sẽ được chúng tôi lưu trữ tại:</p>
							<ul>
								<li>
									Chúng tôi lưu trữ và xử lý thông tin cá nhân của bạn tại các
									máy chủ đặt tại các trung tâm dữ liệu trên lãnh thổ Việt Nam
									của chúng tôi;
								</li>
								<li>
									Thông tin cá nhân của bạn cũng có thể được lưu trữ tại trụ sở
									chính hoặc văn phòng làm việc của chúng tôi hay tại bất kỳ cơ
									sở sao lưu dữ liệu nào khác của chúng tôi tại từng thời điểm;
								</li>
								<li>
									Thời gian lưu trữ thông tin cá nhân được thực hiện theo quy
									định của pháp luật và mục đích lưu trữ dữ liệu của chúng tôi.
								</li>
							</ul>

							<h4>IV. Tiết lộ thông tin cá nhân & thông tin khác</h4>
							<p>
								Thông tin cá nhân của bạn có thể bị tiết lộ bắt buộc cho cơ quan
								nhà nước có thẩm quyền hoặc bên thứ ba có liên quan trong những
								trường hợp sau:
							</p>
							<ul>
								<li>
									Để cung cấp dịch vụ hoặc sản phẩm theo yêu cầu của bạn; Hay
									cần thiết để xử lý đơn đặt hàng (ví dụ: thông tin đăng ký
									sellers ở các shop thương mại điện tử).
								</li>
								<li>
									Thực hiện các nghĩa vụ cung cấp thông tin cá nhân theo yêu cầu
									của cơ quan nhà nước có thẩm quyền hoặc theo quy định của pháp
									luật.
								</li>
								<li>
									Để bảo vệ chúng tôi và các bên thứ ba khác: Chúng tôi chỉ đưa
									ra thông tin tài khoản và những thông tin cá nhân khác khi tin
									chắc rằng việc đưa những thông tin đó là phù hợp với luật
									pháp, bảo vệ quyền lợi, tài sản của bạn và các bên thứ ba
									khác.
								</li>
								<li>
									Ngoài những trường hợp được tiết lộ thông tin nêu trên, chúng
									tôi sẽ không cung cấp thông tin cá nhân và thông tin khác cho
									một bên thứ ba mà không được sự cho phép của bạn. Chúng tôi
									cam kết bảo vệ thông tin của bạn, không mua bán thông tin cá
									nhân của bạn cho các đơn vị khác vì các mục đích thương mại
									hay một mục đích nào khác không phù hợp với quy định của pháp
									luật.
								</li>
							</ul>

							<h3>B. Nguyên tắc bảo mật thông tin của On Hand BI</h3>
							<p>
								Chúng tôi chú trọng việc xây dựng các nguyên tắc bảo vệ quyền
								riêng tư để phù hợp với tất cả mọi người. Điều này đặc biệt quan
								trọng để bạn yên tâm sử dụng các dịch vụ của OHBI mà không phải
								lo ngại đến quyền riêng tư cũng như các thông tin mật của mình
								sẽ bị tiết lộ. Những nguyên tắc bảo mật này đóng vai trò là kim
								chỉ nam để định hướng cho việc duy trì uy tín của OHBI và định
								hướng hoạt động của chúng tôi để đảm bảo sự riêng tư, an toàn và
								bảo mật cho dữ liệu của bạn.
							</p>
							<ol style={{ paddingLeft: "20px" }}>
								<li>
									<strong>Tôn trọng thông tin mà bạn cung cấp</strong>
									<p>
										Khi bạn sử dụng sản phẩm của OHBI và tin tưởng giao thông
										tin cho chúng tôi, chúng tôi có trách nhiệm đáp ứng niềm tin
										đó. Để làm được như thế, chúng tôi luôn cân nhắc cẩn thận về
										những dữ liệu chúng tôi sử dụng, cách sử dụng và bảo vệ
										những dữ liệu đó.
									</p>
								</li>
								<li>
									<strong>
										Trình bày rõ ràng về những dữ liệu chúng tôi thu thập và lý
										do
									</strong>
									<p>
										Để giúp bạn hiểu rõ hơn những dữ liệu mà chúng tôi thu thập
										từ bạn, nhằm tôn trọng và bảo vệ quyền lợi của bạn, chúng
										tôi cố gắng trình bày một cách dễ hiểu về những dữ liệu
										chúng tôi thu thập, cách dữ liệu được sử dụng và lý do sử
										dụng. Bạn vui lòng xem mục II. Về việc thu thập dữ liệu
										người dùng để hiểu lý do OHBI thu thập dữ liệu.
									</p>
								</li>
								<li>
									<strong>
										Không bao giờ bán thông tin cá nhân của bạn cho bất cứ ai
									</strong>
									<p>
										Chúng tôi sử dụng thông tin của bạn cho các mục đích được
										nêu trong mục II. Về việc thu thập dữ liệu người dùng, nhưng
										chúng tôi cam kết rằng chúng tôi không bao giờ bán thông tin
										cá nhân của bạn cho bên thứ ba vì mục đích lợi nhuận.
									</p>
								</li>
								<li>
									<strong>
										Xây dựng quy trình bảo mật thông tin của bạn một cách chặt
										chẽ
									</strong>
									<p>
										Chúng tôi biết rằng không có không gian an ninh hoàn hảo
										không tồn tại trên môi trường mạng (internet). Tuy nhiên,
										chúng tôi cam kết đảm bảo thực hiện nghiêm túc các biện pháp
										bảo mật thông tin cá nhân cũng như bảo mật thông tin báo cáo
										của quý khách trên hệ thống OHBI.
									</p>
								</li>
							</ol>
						</div>
					</div>
					<div className="popup-footer">
						<button className="kc__button--primary" onClick={triggerClose}>
							Close
						</button>
					</div>
				</div>
			</div>), document.body
		);
	}
);

export default TermAndConditionPopup;
