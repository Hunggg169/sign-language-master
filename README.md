# Sign-Language-Master

Dự án về đề tài Sign Language Master

# Giới thiệu về thành viên nhóm (1 người ) và thông tin dự án

- Thành viên nhóm:

* Họ và tên: Quản Trọng Hùng
* Mã sinh viên: 21013345
* Lớp: K15-KHMT (AI&KHDL)
* Vai trò: một mình, đóng vai trò là nhà phát triển full-stack, phân tích, thiết kế, phát triển và kiểm thử.

- Artifacts dự án:

* GitHub Repository: Để quản lý mã nguồn và theo dõi quá trình phát triển (sẽ tạo sau khi cấu trúc dự án cơ bản hoàn thành).
* Google Docs/LaTex: Dùng để ghi lại toàn bộ tài liệu dự án, từ thiết kế, báo cáo tiến độ đến các tài liệu hướng dẫn người dùng.

- Kênh giao tiếp công cụ:

* GitHub: Để theo dõi mã nguồn và lịch sử thay đổi.
* Google Meet: Dùng để liên hệ với giáo viên hoặc các cố vấn.
* Zalo: dung để làm việc và trao đổi với thành viên nhóm.
* Slack hoặc Google Chat: Trao đổi thông tin nếu dự án có thêm thành viên.

# Xây dựng phần mềm nhận diện thủ ngữ (Sign Language Master)

1. Giới Thiệu:

Nhóm chúng em đang phát triển phần mềm **nhận diện thủ ngữ** với mục tiêu giúp người khiếm thính giao tiếp hiệu quả hơn trong cuộc sống hàng ngày. Hiện tại, rào cản ngôn ngữ vẫn là một thách thức lớn đối với họ, và chúng em hy vọng rằng dự án này sẽ giúp thu hẹp khoảng cách đó bằng cách cung cấp một công cụ học tập và giao tiếp tiên tiến. Hệ thống của chúng em sẽ sử dụng sự kết hợp giữa **Python**, **Mediapipe**, **OpenCV**, và **Scikit-Learn** để nhận diện thủ ngữ một cách tự động, cung cấp phản hồi tức thì, đồng thời có khả năng cải thiện độ chính xác qua thời gian nhờ mô hình học máy. Mục tiêu chính là giúp người dùng dễ dàng học và thực hành thủ ngữ, tạo điều kiện thuận lợi để giao tiếp với người khiếm thính. Mặc dù hiện nay quá trình học thủ ngữ thường gặp khó khăn do thiếu tính tương tác và phản hồi, hệ thống của chúng em hứa hẹn sẽ mang đến trải nghiệm học tập trực quan, dễ dàng tiếp cận hơn, đặc biệt với những người không có điều kiện tham gia các khóa học chính quy. Tuy nhiên, một hạn chế của hệ thống hiện tại là chỉ nhận diện được từng chữ cái riêng lẻ thay vì từ hoặc câu hoàn chỉnh, điều này ảnh hưởng đến khả năng giao tiếp mạch lạc. Để khắc phục, nhóm sẽ tập trung tối ưu độ chính xác cho từng chữ cái và nghiên cứu các mô hình kết hợp thành từ trong tương lai. Dù hiện tại dữ liệu chỉ hỗ trợ tiếng Anh, chúng em cũng sẽ mở rộng sang các ngôn ngữ khác để tăng tính đa dạng và ứng dụng. Nếu thành công, hệ thống sẽ góp phần cải thiện chất lượng cuộc sống cho người khiếm thính và thúc đẩy sự hòa nhập xã hội.

2. Tổng Quan:

Nhóm chúng em với ý tưởng phát triển phần mềm nhận diện thủ ngữ mong muốn tạo ra một công cụ hỗ trợ giao tiếp hiệu quả cho người khiếm thính, giúp họ dễ dàng tương tác với cộng đồng xung quanh. Hiện tại, rào cản ngôn ngữ là một thách thức lớn đối với họ trong cuộc sống hàng ngày.Bằng cách ứng dụng công nghệ tiên tiến, chúng em hy vọng phần mềmnày sẽ giúp thu hẹp khoảng cách giao tiếp và nâng cao chất lượng cuộcsống cho người khiếm thính.

3. Mục Đích:

Mục đích của hệ thống là giúp người dùng dễ dàng học và thực hành thủ ngữ thông qua các tương tác trực quan và đơn giản. Bằng cách nhận diện và phản hồi tức thì, hệ thống sẽ hỗ trợ người dùng cải thiện kỹ năng thủ ngữ của mình. Điều này giúp việc học thủ ngữ trở nên dễ tiếp cận hơn và tạo điều kiện thuận lợi cho việc giao tiếp với người khiếm thính trong cuộc sống hàng ngày. Đồng thời, người khiếm thính có thể sử dụng công cụ để dễ dàng hơn trong việc giao tiếp với mọi người.

4. Thực Trạng:

Hiện nay, việc học và thực hành thủ ngữ thường được thực hiện thông qua sách, video, hoặc các khóa học trực tiếp với giáo viên. Tuy nhiên, các phương pháp này có thể thiếu tương tác và không cung cấp phản hồi tức thì, làm cho quá trình học tập trở nên khó khăn và chậm hơn. Hơn nữa, không phải ai cũng có điều kiện tiếp cận với các khóa học chất lượng hoặc có người hướng dẫn. Điều này giới hạn khả năng tự học và thực hành của người dùng.

5. Điểm Mới:

Điểm mới trong phương pháp của chúng em là sử dụng sự kết hợp giữa Python, Mediapipe, OpenCV và Scikit-Learn để xây dựng một hệ thống nhận diện thủ ngữ tự động. Hệ thống này không chỉ cung cấp phản hồi tức thì mà còn có khả năng học hỏi và cải thiện độ chính xác theo thời gian thông qua mô hình học máy. So với các phương pháp truyền thống, hệ thống của chúng em giúp việc học thủ ngữ trở nên trực quan và tương tác hơn, đồng thời có thể tiếp cận dễ dàng hơn đối với người dùng không có điều kiện tham gia các khóa học chuyên sâu. Điều này làm cho quá trình học thủ ngữ trở nên hiệu quả và thuận tiện hơn.

6. Lợi Ích:

Nếu thành công, hệ thống này sẽ tạo ra sự khác biệt đáng kể trong việc học và giao tiếp bằng thủ ngữ, đặc biệt là đối với người khiếm thính và những người muốn học thủ ngữ. Nó sẽ giúp người dùng dễ dàng tiếp cận và học thủ ngữ một cách hiệu quả hơn, ngay cả khi họ không có điều kiện tham gia các khóa học chính quy. Điều này không chỉ thúc đẩy sự hòa nhập xã hội của người khiếm thính mà còn tăng cường sự hiểu biết và giao tiếp giữa họ và cộng đồng.

7. Hạn Chế:

Thách thức lớn nhất mà chúng em dự đoán trong quá trình phát triển dự án là hệ thống hiện tại chỉ có khả năng chuyển đổi từ thủ ngữ thành các chữ cái riêng lẻ, thay vì các từ hoặc cụm từ hoàn chỉnh. Điều này giới hạn khả năng của hệ thống trong việc hiểu và truyền đạt các câu hoàn chỉnh, dẫn đến giao tiếp chưa đầy đủ. Để giảm thiểu rủi ro này, chúng em sẽ tập trung vào việc tối ưu hóa độ chính xác trong việc nhận diện từng chữ cái, đồng thời nghiên cứu và phát triển các mô hình ghép nối chữ cái thành cụm từ có nghĩa trong tương lai. Ngoài ra, do tập dữ liệu hiện tại chỉ hỗ trợ tiếng Anh, chúng em sẽ mở rộng sang các ngôn ngữ khác để tăng tính đa dạng và ứng dụng củahệ thống.

# Dự Án:

1. Kiến trúc tổng thể:

- Frontend: Giao diện người dùng, có thể sử dụng các công nghệ như HTML, CSS, JavaScript, React để hiển thị video từ webcam và hiển thị kết quả nhận diện.
- Backend: Sử dụng Flask hoặc Django (frameworks Python) để triển khai các chức năng xử lý hình ảnh và nhận diện thủ ngữ.
- Machine Learning & Video Processing: Sử dụng Python với Mediapipe, OpenCV, và Scikit-learn để thực hiện nhận diện cử chỉ tay và trả kết quả về frontend.

2. Cụ thể các bước cần làm:

a. Phát triển Backend với Python:

- Flask/Django:

* Flask là framework nhẹ, đơn giản, phù hợp cho các dự án nhỏ và trung bình. Django có thể cung cấp các tính năng mạnh mẽ hơn nếu bạn dự định mở rộng lớn.
* Flask/Django sẽ chịu trách nhiệm nhận dữ liệu từ frontend (video cử chỉ từ người dùng), xử lý qua Mediapipe và mô hình học máy, sau đó trả kết quả nhận diện lại cho frontend.

- Xử lý video với Mediapipe và OpenCV:
  Dùng OpenCV để lấy các khung hình từ video được truyền vào, sau đó Mediapipe để nhận diện bàn tay và trích xuất các đặc trưng. Sau khi trích xuất đặc trưng, dùng mô hình đã huấn luyện (Scikit-learn) để dự đoán ký tự tương ứng với cử chỉ tay.

b. Phát triển Frontend:

- HTML5 và JavaScript (hoặc React):

* Sử dụng HTML5 để truy cập webcam của người dùng. Bạn có thể sử dụng getUserMedia() API của JavaScript để lấy luồng video.
* Sau khi người dùng thực hiện cử chỉ tay, video sẽ được gửi qua API tới backend để xử lý và nhận diện ký tự.
* Giao diện đơn giản: Thiết kế giao diện dễ hiểu, nơi người dùng có thể nhìn thấy mình qua webcam, nhận phản hồi bằng ký tự hoặc từ được nhận diện.

c. Kết hợp Frontend và Backend:

API: Sử dụng REST API hoặc WebSockets để truyền dữ liệu từ frontend (video) sang backend. Sau khi nhận diện, backend trả về ký tự/từ mà mô hình đã nhận dạng.
Kết quả: Hiển thị kết quả nhận diện trên giao diện.

3. Các bước thực hiện chi tiết:

Bước 1: Cài đặt môi trường phát triển (Flask/Django, Mediapipe, OpenCV, Scikit-learn).

Bước 2: Xây dựng API trong Flask/Django để xử lý dữ liệu video.

Bước 3: Kết nối frontend với backend thông qua API.

Bước 4: Huấn luyện mô hình Scikit-learn cho nhận diện thủ ngữ (hoặc sử dụng mô hình có sẵn nếu phù hợp).

Bước 5: Kiểm thử hệ thống, tinh chỉnh mô hình và cải thiện trải nghiệm người dùng.

# Mô tả dự án:

1. Ý tưởng dự án:
   "Sign Language Master" là một ứng dụng web giúp người học thủ ngữ hoặc người khiếm thính có thể giao tiếp hiệu quả hơn với cộng đồng. Ứng dụng sẽ sử dụng camera để nhận diện cử chỉ tay của người dùng và chuyển đổi thành các ký tự hoặc từ trong ngôn ngữ viết.

2. Các tính năng chính(MVP):

- Nhận diện thủ ngữ: Sử dụng camera để nhận diện cử chỉ tay và chuyển đổi thành các ký tự (A-Z) theo bảng thủ ngữ.
- Học thủ ngữ: Người dùng có thể luyện tập với các bài học về thủ ngữ từng chữ cái hoặc cả câu.
- Theo dõi tiến độ học: Ghi lại quá trình và đánh giá sự tiến bộ của người dùng qua các bài học và bài kiểm tra.

3. Trường hợp sử dụng (Use Cases):

- Use Case 1: Học thủ ngữ từng chữ cái

* Actor: Người dùng (muốn học thủ ngữ).
* Trigger: Người dùng chọn chế độ "Học chữ cái" trong giao diện chính.
* Preconditions: Người dùng đã đăng nhập vào hệ thống và đã bật camera.
* Postconditions: Người dùng hoàn thành một bài học và nhận được phản hồi về độ chính xác.
* Các bước thực hiện:
  1. Người dùng chọn mục "Học chữ cái" từ menu.
  2. Hệ thống hiển thị một chữ cái trong bảng chữ cái.
  3. Người dùng thực hiện cử chỉ tay tương ứng.
  4. Hệ thống sử dụng camera để nhận diện cử chỉ.
  5. Hệ thống hiển thị phản hồi (đúng/sai) và chuyển sang chữ cái tiếp theo.
  6. Sau khi hoàn thành bài học, hệ thống đưa ra đánh giá tổng quan.
* Các biến thể: Người dùng có thể chọn các chế độ học khác nhau như học theo thứ tự hoặc học ngẫu nhiên.
* Các ngoại lệ: Nếu camera không thể nhận diện hoặc cử chỉ không rõ ràng, hệ thống sẽ yêu cầu người dùng thử lại.

- Use Case 2: Nhận diện thủ ngữ trong giao tiếp

* Actor: Người dùng muốn sử dụng thủ ngữ để giao tiếp.
* Trigger: Người dùng chọn chế độ "Giao tiếp" và bắt đầu làm các cử chỉ tay.
* Preconditions: Người dùng đã bật camera và chọn chế độ nhận diện.
* Postconditions: Hệ thống nhận diện chính xác và hiển thị văn bản tương ứng với cử chỉ tay.
* Các bước thực hiện:
  1. Người dùng chọn mục "Giao tiếp" trong menu.
  2. Hệ thống hiển thị giao diện nhận diện.
  3. Người dùng thực hiện các cử chỉ tay tương ứng với các chữ cái.
  4. Hệ thống nhận diện cử chỉ và chuyển đổi thành văn bản trên màn hình.
  5. Văn bản được hiển thị cho đối phương hoặc người dùng.
* Các ngoại lệ: Nếu ánh sáng yếu hoặc cử chỉ không rõ, hệ thống sẽ thông báo và yêu cầu người dùng thử lại.

- Use Case 3: Đánh giá tiến độ học thủ ngữ

* Actor: Người dùng (muốn kiểm tra và đánh giá tiến độ học tập của mình).
* Trigger: Người dùng chọn mục "Đánh giá tiến độ" từ giao diện chính.
* Preconditions: Người dùng đã hoàn thành ít nhất một số bài học hoặc bài kiểm tra trong ứng dụng.
* Postconditions: Hệ thống hiển thị đánh giá về tiến độ học tập của người dùng (bao gồm số lượng chữ cái, từ đã học, độ chính xác của cử chỉ và điểm số tổng thể).

* Các bước thực hiện:

1. Người dùng đăng nhập vào hệ thống và chọn "Đánh giá tiến độ" từ menu chính.
2. Hệ thống truy xuất thông tin về quá trình học tập của người dùng (bao gồm các bài học đã hoàn thành, thời gian học và độ chính xác của cử chỉ).
3. Hệ thống tính toán điểm số và độ tiến bộ dựa trên các yếu tố: độ chính xác, số lần thực hành, và mức độ khó của bài học.
4. Hệ thống hiển thị một bảng thông tin chi tiết về tiến độ học tập (ví dụ: số lượng bài học đã hoàn thành, số chữ cái nhận diện chính xác, các từ đã học được và các cử chỉ tay mà người dùng cần cải thiện).
5. Người dùng có thể xem lịch sử tiến độ của mình dưới dạng biểu đồ (nếu có).

- Các biến thể:

* Người dùng có thể chọn một khoảng thời gian cụ thể để xem tiến độ (ví dụ: tuần này, tháng này, toàn bộ thời gian học).
* Hệ thống có thể gợi ý các bài học hoặc bài kiểm tra tiếp theo dựa trên tiến độ hiện tại của người dùng.

- Các ngoại lệ:

* Nếu người dùng chưa hoàn thành bất kỳ bài học nào, hệ thống sẽ hiển thị thông báo khuyến khích họ bắt đầu học và không hiển thị thông tin đánh giá.

=> Use case này giúp người dùng không chỉ theo dõi được quá trình học tập của mình mà còn có thể biết được họ cần cải thiện kỹ năng nào, từ đó tạo động lực để họ tiếp tục học thủ ngữ hiệu quả hơn.

# Quy trình phát triển nhóm:

- Công cụ phát triển:

* Frontend: Sử dụng HTML5, CSS3, Bootstrap để thiết kế giao diện responsive, dễ sử dụng và thân thiện với người dùng.
* Backend: Sử dụng Python với Flask để xây dựng API, xử lý dữ liệu từ camera và cung cấp kết quả nhận diện.
* Thư viện Python: Mediapipe, OpenCV, Scikit-Learn để xử lý video và nhận diện cử chỉ tay.

- Lịch trình phát triển (chi tiết từng tuần):

* Tuần 1:

  - Thiết kế giao diện cơ bản với Bootstrap: tạo các trang chính như Trang chủ, Học thủ ngữ, và Theo dõi tiến độ.
  - Cài đặt và cấu hình Flask làm backend cho dự án.

* Tuần 2:

  - Tích hợp camera trong giao diện web bằng cách sử dụng JavaScript và WebRTC.
  - Tích hợp Mediapipe và OpenCV để xử lý hình ảnh và video từ camera.

* Tuần 3:

  - Phát triển tính năng nhận diện cử chỉ tay từng chữ cái và kết nối với backend Python.
  - Hoàn thành tính năng phản hồi tức thì về độ chính xác của cử chỉ.

* Tuần 4:

  - Xây dựng chức năng "Học thủ ngữ" với các bài học và bài kiểm tra.
  - Tích hợp hệ thống đánh giá và theo dõi tiến độ người dùng.

* Tuần 5:

  - Kiểm thử tính năng nhận diện và tối ưu hóa hiệu suất.
  - Triển khai hệ thống trên môi trường thử nghiệm để kiểm tra thực tế.

* Tuần 6:
  - Hoàn thành tài liệu hướng dẫn sử dụng và tài liệu kỹ thuật.
  - Thực hiện kiểm tra cuối cùng và chuẩn bị báo cáo.

- Rủi ro và thách thức:

1. Khả năng nhận diện: Nếu điều kiện ánh sáng kém hoặc chất lượng video không tốt, hệ thống có thể không nhận diện được chính xác.
2. Khối lượng công việc lớn: Với chỉ một người phát triển cả frontend và backend, cần có kế hoạch chặt chẽ và chia nhỏ công việc để đảm bảo tiến độ.
3. Tính bảo mật: Đảm bảo hệ thống lưu trữ thông tin cá nhân một cách an toàn và không rò rỉ dữ liệu.

- Điểm lấy phản hồi:

* Sau tuần 3-4: Sau khi hoàn thành chức năng nhận diện và học thủ ngữ cơ bản, cần thu thập phản hồi từ người dùng thực tế (có thể từ người khiếm thính hoặc người học thủ ngữ).
* Cuối tuần 6: Thực hiện kiểm tra cuối cùng và lấy phản hồi từ cố vấn hoặc giảng viên trước khi nộp báo cáo.
