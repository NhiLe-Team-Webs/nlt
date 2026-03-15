import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileInfoModal from "../components/profile-info-modal";
import ReturnMemberQuizModal from "../components/return-member-quiz-modal";
import {
  CheckCircle2,
  Calendar,
  Video,
  ArrowRight,
  User,
  LogOut,
  Menu,
  X,
  ClipboardCheck,
  BrainCircuit,
  PartyPopper,
  Zap,
  RotateCcw,
  XCircle,
  Send,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TeamKey = "Admin" | "Comment" | "Content" | "Design" | "Editor" | "Exercise" | "Show" | "Subtitle" | "IT" | "HR";
type Scores = Partial<Record<TeamKey, number>>;

// ─── Culture Test (Step 1) ────────────────────────────────────────────────────

const CULTURE_QUESTIONS = [
  { q: "Tại sao cần xem hết video của Chị Nhi trước khi đặt câu hỏi?", a: ["Video rất hay và thú vị", "Thể hiện sự quan tâm", "Câu hỏi của bạn có thể đã được trả lời rồi", "Để tạo mối quan hệ với mentor"], correct: 2 },
  { q: "Tại sao cần gửi tin nhắn phản hồi khi nhận thông báo?", a: ["Thể hiện sự chuyên nghiệp", "Thể hiện sự tôn trọng và xác nhận đã nhận thông tin", "Để trông thân thiện hơn", "Để cho thấy bạn đang online"], correct: 1 },
  { q: "Tại sao thành viên NhiLe Team phải có tên và ảnh đại diện rõ ràng?", a: ["Để nhận diện, tôn trọng đồng đội và tự tôn trọng bản thân", "Để tăng tương tác", "Để nổi bật trong nhóm", "Cho vui"], correct: 0 },
  { q: 'Tại sao tránh dùng những từ vô nghĩa như "sẽ", "hi vọng", "cố gắng", "thử", "mong"?', a: ["Team yêu cầu giao tiếp ngắn gọn", "Chúng có vẻ không chân thật", "Chúng cản trở khả năng quyết đoán của bản thân", "Chúng tạo ra căng thẳng không cần thiết"], correct: 2 },
  { q: "Điều gì bị cấm nhất trong NhiLe Team?", a: ["Trễ deadline", "Bất đồng và ý kiến trái chiều", "Vắng mặt trong các buổi họp", "Drama, gossip và không hỗ trợ thành viên mới"], correct: 3 },
  { q: "Tại sao NhiLe Team thực hiện feedback cho nhau?", a: ["Tự thể hiện bản thân", "Gây ấn tượng với người khác", "Giúp thành viên phát triển liên tục", "Tạo sự cạnh tranh lành mạnh"], correct: 2 },
  { q: "Tại sao NhiLe Team có văn hóa đóng quỹ?", a: ["Làm giàu cho nhóm về mặt tài chính", "Khuyến khích làm việc chăm chỉ hơn", "Đối mặt với hậu quả của lỗi lầm và học trách nhiệm", "Hỗ trợ các dự án mới"], correct: 2 },
  { q: "NhiLe Team được thành lập để làm gì?", a: ["Tạo cộng đồng trực tuyến chuyên nghiệp", "Xây dựng môi trường tích cực cho người Việt học hỏi, kết nối và phát triển", "Chia sẻ kiến thức và nâng cao hình ảnh cá nhân", "Đào tạo các nhà lãnh đạo xuất sắc"], correct: 1 },
  { q: "Điều quan trọng nhất khi làm việc nhóm là gì?", a: ["Hoàn thành phần của mình", "Làm nhiều hơn để được ghi nhận", "Hỗ trợ nhau và duy trì thái độ tích cực", "Làm việc im lặng"], correct: 2 },
  { q: "Khi có việc cá nhân, bạn nên làm gì?", a: ["Không cần báo cáo", "Im lặng", "Tắt thiết bị", "Thông báo cho leader hoặc nhóm trước"], correct: 3 },
];

// ─── Role-Fit Test (Step 2) ───────────────────────────────────────────────────

const ROLE_QUESTIONS: { q: string; options: { text: string; scores: Scores }[] }[] = [
  { q: "Khi tham gia một dự án, bạn muốn đóng góp vai trò nào nhất?", options: [{ text: "Lên kế hoạch, sắp xếp công việc trong team.", scores: { Admin: 1 } }, { text: "Phản hồi, giải đáp bình luận, tương tác với cộng đồng.", scores: { Comment: 1 } }, { text: "Viết nội dung, sáng tạo ý tưởng cho dự án.", scores: { Content: 1 } }, { text: "Thiết kế hình ảnh, banner, poster cho dự án.", scores: { Design: 1 } }, { text: "Tự tay quay, dựng, cắt ghép video, thêm hiệu ứng.", scores: { Editor: 1 } }, { text: "Đảm bảo mọi người cùng rèn luyện, quản lý danh sách tập thể dục.", scores: { Exercise: 1 } }] },
  { q: "Trong một buổi livestream, bạn thích phụ trách nhiệm vụ gì nhất?", options: [{ text: "Chuẩn bị sự kiện, set up hậu trường, kịch bản.", scores: { Show: 1 } }, { text: "Dịch và chèn phụ đề (nếu livestream có nội dung tiếng Anh).", scores: { Subtitle: 1 } }, { text: "Đảm bảo hệ thống kỹ thuật, code chức năng hỗ trợ nếu cần.", scores: { IT: 1 } }, { text: "Quản lý hồ sơ nhân sự, hoặc hỗ trợ team tuyển người phát sóng.", scores: { HR: 1 } }, { text: "Trực tiếp quản trị fanpage, xem báo cáo realtime.", scores: { Admin: 1 } }, { text: "Tham gia comment, hỗ trợ giải đáp tức thì cho khán giả.", scores: { Comment: 1 } }] },
  { q: "Bạn có niềm vui khi làm công việc nào nhất?", options: [{ text: "Theo dõi tiến độ, quản lý deadline, báo cáo kết quả.", scores: { Admin: 1 } }, { text: "Trò chuyện, giao lưu, tạo không khí sôi nổi trên MXH.", scores: { Comment: 1 } }, { text: "Biên soạn nội dung, viết bài, sáng tạo chủ đề.", scores: { Content: 1 } }, { text: "Xử lý hình ảnh, phối màu, sắp xếp bố cục đẹp mắt.", scores: { Design: 1 } }, { text: "Chỉnh sửa video, thêm âm thanh, hiệu ứng, chuyển cảnh.", scores: { Editor: 1 } }, { text: "Huấn luyện và theo dõi hoạt động thể chất, thúc đẩy tinh thần tập luyện.", scores: { Exercise: 1 } }] },
  { q: "Đối với bạn, công đoạn nào quan trọng nhất khi sản xuất một video?", options: [{ text: "Chuẩn bị kịch bản sự kiện, mời khách mời, dàn dựng.", scores: { Show: 1 } }, { text: "Dịch phụ đề, đảm bảo người xem hiểu nội dung.", scores: { Subtitle: 1 } }, { text: "Viết code, hoặc xây tool hỗ trợ ghi hình/phân phối.", scores: { IT: 1 } }, { text: "Chọn người phù hợp, phân công nhân lực.", scores: { HR: 1 } }, { text: "Kiểm soát khâu hậu cần, timeline và tài nguyên.", scores: { Admin: 1 } }, { text: "Phản hồi, trả lời comment sau khi video đăng.", scores: { Comment: 1 } }] },
  { q: "Bạn thấy mình mạnh nhất ở kỹ năng nào sau đây?", options: [{ text: "Quản lý thông tin, sắp xếp dữ liệu.", scores: { Admin: 1 } }, { text: "Phản ứng nhanh, giao tiếp tốt với khán giả.", scores: { Comment: 1 } }, { text: "Biến ý tưởng thành bài viết, nội dung thu hút.", scores: { Content: 1 } }, { text: "Vẽ, thiết kế, sáng tạo bố cục.", scores: { Design: 1 } }, { text: "Quay dựng, xử lý hậu kỳ video.", scores: { Editor: 1 } }, { text: "Lập bảng nhắc nhở, thúc đẩy mọi người tập thể dục.", scores: { Exercise: 1 } }] },
  { q: "Bạn thích thử thách nào nhất?", options: [{ text: "Tổ chức, sắp xếp một sự kiện, show lớn.", scores: { Show: 1 } }, { text: "Dịch và biên tập video tiếng Anh sang tiếng Việt.", scores: { Subtitle: 1 } }, { text: "Lập trình website hoặc tính năng mới.", scores: { IT: 1 } }, { text: "Tuyển dụng, đánh giá năng lực ứng viên.", scores: { HR: 1 } }, { text: "Kiểm soát, theo dõi tiến độ, KPI, deadline.", scores: { Admin: 1 } }, { text: "Tương tác, trả lời bình luận, câu hỏi.", scores: { Comment: 1 } }] },
  { q: "Bạn muốn nâng cao kỹ năng nào nhất trong thời gian tới?", options: [{ text: "Sáng tạo nội dung, viết kịch bản, blog, bài PR.", scores: { Content: 1 } }, { text: "Thiết kế Canva, Photoshop, banner, thumbnail.", scores: { Design: 1 } }, { text: "Biên tập video, chèn hiệu ứng, xử lý audio.", scores: { Editor: 1 } }, { text: "Quản lý team, phân công, giám sát.", scores: { Admin: 1 } }, { text: "Tạo sự kiện, tổ chức talkshow, phỏng vấn.", scores: { Show: 1 } }, { text: "Theo dõi – thống kê lịch tập luyện hằng ngày.", scores: { Exercise: 1 } }] },
  { q: "Trong công việc, khi thấy ai đó gặp vướng mắc, bạn sẽ...", options: [{ text: "Trao đổi, gợi ý giải quyết, hỗ trợ tinh thần.", scores: { HR: 1 } }, { text: "Viết nội dung hướng dẫn, FAQ để họ tham khảo.", scores: { Content: 1 } }, { text: "Thiết kế sơ đồ, infographic minh họa hướng giải quyết.", scores: { Design: 1 } }, { text: "Quay video tutorial, chỉnh sửa để họ xem dễ hơn.", scores: { Editor: 1 } }, { text: "Thiết lập biểu mẫu quản lý, sắp xếp thông tin.", scores: { Admin: 1 } }, { text: "Trực chat, trả lời bình luận, tin nhắn.", scores: { Comment: 1 } }] },
  { q: "Trong mảng truyền thông, bạn thích theo dõi và phân tích khía cạnh gì nhất?", options: [{ text: "Lượng tương tác, bình luận, chia sẻ.", scores: { Comment: 1 } }, { text: "Chất lượng bài viết, câu chữ, chủ đề.", scores: { Content: 1 } }, { text: "Thiết kế hình ảnh, màu sắc, bố cục.", scores: { Design: 1 } }, { text: "Hiệu ứng video, âm thanh, thời lượng.", scores: { Editor: 1 } }, { text: "Cách thức quản lý, KPI, chỉ số fanpage.", scores: { Admin: 1 } }, { text: "Phương pháp sắp xếp nhân sự phù hợp.", scores: { HR: 1 } }] },
  { q: "Nếu cần tăng cường tinh thần rèn luyện sức khỏe trong team, bạn sẽ làm gì?", options: [{ text: "Tổ chức các buổi event thể thao, mini games.", scores: { Show: 1 } }, { text: "Dịch hoặc sưu tầm video tập luyện.", scores: { Subtitle: 1 } }, { text: "Xây app tính toán calo, nhắc lịch tập.", scores: { IT: 1 } }, { text: "Động viên, tạo group, hướng dẫn cơ bản.", scores: { Exercise: 1 } }, { text: "Quản lý danh sách, thống kê thành viên tham gia.", scores: { Admin: 1 } }, { text: "Tìm, tuyển coach, hoặc tạo quy trình khen thưởng.", scores: { HR: 1 } }] },
  { q: "Với bạn, đâu là điểm quan trọng khi tạo ra nội dung video chất lượng?", options: [{ text: "Kịch bản rõ ràng, ngôn từ cuốn hút.", scores: { Content: 1 } }, { text: "Hình ảnh – chữ thiết kế đẹp, thumbnails nổi bật.", scores: { Design: 1 } }, { text: "Hậu kỳ, cắt ghép, âm thanh, ánh sáng.", scores: { Editor: 1 } }, { text: "Quản lý thời gian, sắp xếp lịch đăng, phân bổ nguồn lực.", scores: { Admin: 1 } }, { text: "Mời khách mời, tạo chủ đề hấp dẫn cho show.", scores: { Show: 1 } }, { text: "Có người hỗ trợ kiểm tra sức khoẻ, gắn kết nhóm.", scores: { Exercise: 1 } }] },
  { q: "Trước một dự án lớn, bạn chủ động làm gì đầu tiên?", options: [{ text: "Xây dựng khung nhân sự, phân vai trò, lên danh sách phỏng vấn.", scores: { HR: 1 } }, { text: "Viết ý tưởng, đề cương nội dung chi tiết.", scores: { Content: 1 } }, { text: "Thiết kế layout, banner, hình ảnh nhận diện.", scores: { Design: 1 } }, { text: "Cấu hình công cụ, code tính năng cần thiết.", scores: { IT: 1 } }, { text: "Chuẩn bị timeline, lịch họp, deadline, báo cáo.", scores: { Admin: 1 } }, { text: "Quay clip teaser, chỉnh sửa ngắn gọn.", scores: { Editor: 1 } }] },
  { q: "Bạn sẵn sàng dành nhiều thời gian nhất cho việc gì?", options: [{ text: "Trò chuyện, tư vấn, tuyển người.", scores: { HR: 1 } }, { text: "Viết và biên tập nội dung, đảm bảo câu chữ hay.", scores: { Content: 1 } }, { text: "Thiết kế, cải thiện giao diện, hình ảnh trực quan.", scores: { Design: 1 } }, { text: "Kiểm tra chất lượng video, ghép hiệu ứng.", scores: { Editor: 1 } }, { text: "Tìm giải pháp công nghệ, tạo tool hỗ trợ.", scores: { IT: 1 } }, { text: "Quản lý, giám sát, theo dõi tiến độ.", scores: { Admin: 1 } }] },
  { q: "Khi mọi người cần theo dõi hoạt động thể dục, bạn sẵn lòng...", options: [{ text: "Kêu gọi, thống kê, nhắc lịch, tổng hợp thông tin.", scores: { Exercise: 2 } }, { text: "Thiết kế poster, infographic khuyến khích tập luyện.", scores: { Design: 1 } }, { text: "Biên tập video, demo hướng dẫn bài tập.", scores: { Editor: 1 } }, { text: "Viết nội dung, blog chia sẻ kinh nghiệm.", scores: { Content: 1 } }, { text: "Quản lý danh sách, chia ca, phân công.", scores: { Admin: 1 } }, { text: "Liên hệ PT, setup event chạy bộ chung.", scores: { Show: 1 } }] },
  { q: "Bạn thường làm gì để event hay show diễn ra thuận lợi?", options: [{ text: "Quay phim, chụp hình, làm tư liệu cho chương trình.", scores: { Editor: 1 } }, { text: "Dịch nội dung, nếu cần tiếp cận khán giả quốc tế.", scores: { Subtitle: 1 } }, { text: "Chuẩn bị khách mời, kịch bản, MC, thời gian.", scores: { Show: 1 } }, { text: "Tổ chức nhân sự, điều phối người phù hợp.", scores: { HR: 1 } }, { text: "Thiết lập form đăng ký, quản lý thông tin.", scores: { Admin: 1 } }, { text: "Viết bài giới thiệu, PR cho sự kiện.", scores: { Content: 1 } }] },
  { q: "Phần nào của dự án bạn muốn 'tự tay' làm nhất?", options: [{ text: "Thiết kế, layout, banner, logo.", scores: { Design: 2 } }, { text: "Dựng video, cắt ghép, thêm nhạc, hiệu ứng.", scores: { Editor: 2 } }, { text: "Xây ứng dụng, website.", scores: { IT: 2 } }, { text: "Phát triển ý tưởng, viết nội dung.", scores: { Content: 2 } }, { text: "Quản trị kế hoạch, báo cáo tiến độ, KPI.", scores: { Admin: 2 } }, { text: "Tổ chức buổi ra mắt, họp báo, mời khách mời.", scores: { Show: 2 } }] },
  { q: "Trong môi trường làm việc, bạn muốn thể hiện thế mạnh gì?", options: [{ text: "Quản lý hồ sơ, phỏng vấn, trao đổi với ứng viên.", scores: { HR: 1 } }, { text: "Kết nối với khán giả, fan, trả lời comment.", scores: { Comment: 1 } }, { text: "Sáng tạo nội dung, viết bài, kịch bản chi tiết.", scores: { Content: 1 } }, { text: "Tối ưu thiết kế, mang tính thẩm mỹ cao.", scores: { Design: 1 } }, { text: "Theo dõi, thúc đẩy mục tiêu sức khỏe, thói quen tốt.", scores: { Exercise: 1 } }, { text: "Quản lý thông tin, sắp xếp báo cáo, điều phối.", scores: { Admin: 1 } }] },
  { q: "Khi có video tiếng Anh cần phát hành gấp, bạn sẽ...", options: [{ text: "Nhanh chóng dịch, chèn phụ đề, canh chỉnh timeline.", scores: { Subtitle: 2 } }, { text: "Chỉ lo phần quay dựng, chỉnh âm thanh, cắt ghép.", scores: { Editor: 1 } }, { text: "Viết nội dung mô tả, caption, tiêu đề.", scores: { Content: 1 } }, { text: "Đề xuất tạo show phỏng vấn ngắn với người nói tiếng Anh.", scores: { Show: 1 } }, { text: "Sửa soạn team nhân sự cần thiết để hoàn thành nhanh.", scores: { HR: 1 } }, { text: "Sắp xếp timeline, chia công việc, deadline.", scores: { Admin: 1 } }] },
  { q: "Bạn muốn đầu tư thời gian học hỏi kỹ năng nào nhất?", options: [{ text: "Code, xây dựng giải pháp công nghệ.", scores: { IT: 2 } }, { text: "Phát triển kỹ năng lãnh đạo, quản trị nhân sự.", scores: { HR: 2 } }, { text: "Viết, nghiên cứu và sáng tạo nội dung.", scores: { Content: 2 } }, { text: "Tổ chức, thực hiện sự kiện chuyên nghiệp.", scores: { Show: 2 } }, { text: "Quản lý tác vụ, tối ưu KPI, theo dõi dữ liệu.", scores: { Admin: 2 } }, { text: "Xây dựng thương hiệu cá nhân qua hình ảnh, design, video.", scores: { Design: 1, Editor: 1 } }] },
  { q: "Nhìn lại tất cả các lĩnh vực sau đây, bạn thực sự muốn 'dấn thân' nhất ở đâu?", options: [{ text: "Đồng hành và thúc đẩy sức khỏe cho tập thể.", scores: { Exercise: 2 } }, { text: "Sắp xếp nhân sự, tuyển dụng, đào tạo.", scores: { HR: 2 } }, { text: "Thiết kế, làm đẹp cho mọi ấn phẩm.", scores: { Design: 2 } }, { text: "Biên tập video, tạo sản phẩm hình ảnh sống động.", scores: { Editor: 2 } }, { text: "Tự tay phát triển sản phẩm công nghệ, web/app.", scores: { IT: 2 } }, { text: "Kiến tạo nội dung, truyền tải câu chuyện, thông điệp.", scores: { Content: 2 } }] },
];

const TEAM_INFO: Record<TeamKey, { label: string; desc: string; emoji: string }> = {
  Admin: { label: "Team Admin", desc: "Quản lý kế hoạch, theo dõi tiến độ và KPI của team", emoji: "📋" },
  Comment: { label: "Team Comment", desc: "Tương tác cộng đồng, trả lời bình luận và fan", emoji: "💬" },
  Content: { label: "Team Content", desc: "Sáng tạo nội dung, viết bài, kịch bản thu hút", emoji: "✍️" },
  Design: { label: "Team Design", desc: "Thiết kế hình ảnh, banner, thumbnail đẹp mắt", emoji: "🎨" },
  Editor: { label: "Team Editor", desc: "Quay dựng, chỉnh sửa video, xử lý hậu kỳ", emoji: "🎬" },
  Exercise: { label: "Team Exercise", desc: "Thúc đẩy sức khỏe, quản lý lịch tập cho team", emoji: "💪" },
  Show: { label: "Team Show & Sự kiện", desc: "Tổ chức sự kiện, livestream, talkshow chuyên nghiệp", emoji: "🎤" },
  Subtitle: { label: "Team Subtitle", desc: "Dịch phụ đề, biên tập ngôn ngữ cho video", emoji: "🌐" },
  IT: { label: "Team IT", desc: "Lập trình, phát triển website và tools hỗ trợ", emoji: "💻" },
  HR: { label: "Team HR", desc: "Tuyển dụng, đào tạo, quản lý nhân sự team", emoji: "👥" },
};

const EMPTY_SCORES: Record<TeamKey, number> = { Admin: 0, Comment: 0, Content: 0, Design: 0, Editor: 0, Exercise: 0, Show: 0, Subtitle: 0, IT: 0, HR: 0 };
const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];
const TIMER_SECONDS = 30;
const PASS_SCORE = 8;

// ─── Component ───────────────────────────────────────────────────────────────

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || localStorage.getItem("nlt_userType") || "new";
  const isActiveMember = userType === "active";
  const isReturning = userType === "returning";
  const totalSteps = isActiveMember ? 3 : 5;

  const [currentStep, setCurrentStep] = useState(() =>
    (location.state?.userType || "new") === "returning"
      ? parseInt(localStorage.getItem("nlt_rt_step") || "1")
      : 1
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Quiz modal states
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeQuizType, setActiveQuizType] = useState<"culture" | "role" | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [roleScores, setRoleScores] = useState<Record<TeamKey, number>>({ ...EMPTY_SCORES });
  const finalRoleScoresRef = useRef<Record<TeamKey, number>>({ ...EMPTY_SCORES });

  // Return test states
  const [returnTestOpened, setReturnTestOpened] = useState(() => localStorage.getItem("nlt_rt_opened") === "true");
  const [returnTestResult, setReturnTestResult] = useState<"none" | "pass" | "fail">(() => (localStorage.getItem("nlt_rt_result") as "none" | "pass" | "fail") || "none");
  const [showReturnQuiz, setShowReturnQuiz] = useState(false);

  // Step 5 states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileDone, setProfileDone] = useState(false);
  const [signDone, setSignDone] = useState(false);
  const [showChotDon, setShowChotDon] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  // Per-question timer
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cultureQuestions = CULTURE_QUESTIONS;
  const roleQuestions = ROLE_QUESTIONS;
  const totalQuestions = activeQuizType === "role" ? roleQuestions.length : cultureQuestions.length;

  useEffect(() => {
    if (!isQuizModalOpen || showQuizResult) return;
    setTimer(TIMER_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQuestionIndex, isQuizModalOpen, showQuizResult]);

  useEffect(() => { setIsLoaded(true); }, []);
  useEffect(() => { if (isReturning) localStorage.setItem("nlt_rt_opened", returnTestOpened.toString()); }, [returnTestOpened, isReturning]);
  useEffect(() => { if (isReturning) localStorage.setItem("nlt_rt_result", returnTestResult); }, [returnTestResult, isReturning]);
  useEffect(() => { if (isReturning) localStorage.setItem("nlt_rt_step", currentStep.toString()); }, [currentStep, isReturning]);

  const openQuiz = (type: "culture" | "role") => {
    const resuming = activeQuizType === type && quizAnswers.length > 0 && !showQuizResult;
    if (!resuming) {
      setActiveQuizType(type);
      setCurrentQuestionIndex(0);
      setQuizAnswers([]);
      setQuizScore(0);
      setShowQuizResult(false);
      setQuizPassed(false);
      setRoleScores({ ...EMPTY_SCORES });
      finalRoleScoresRef.current = { ...EMPTY_SCORES };
    } else {
      setActiveQuizType(type);
    }
    setIsQuizModalOpen(true);
  };

  const closeQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsQuizModalOpen(false);
  };

  const handleAnswer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (activeQuizType === "role") {
      const scoring = roleQuestions[currentQuestionIndex].options[idx].scores;
      const newScores = { ...roleScores };
      for (const [team, pts] of Object.entries(scoring)) {
        newScores[team as TeamKey] = (newScores[team as TeamKey] || 0) + (pts as number);
      }
      setRoleScores(newScores);
      if (currentQuestionIndex < roleQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        finalRoleScoresRef.current = newScores;
        setShowQuizResult(true);
      }
    } else {
      const newAnswers = [...quizAnswers, idx];
      setQuizAnswers(newAnswers);
      if (currentQuestionIndex < cultureQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const score = newAnswers.filter((ans, i) => ans === cultureQuestions[i].correct).length;
        const passed = score >= PASS_SCORE;
        setQuizScore(score);
        setQuizPassed(passed);
        setShowQuizResult(true);
        if (passed) {
          setTimeout(() => {
            closeQuiz();
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 2000);
        }
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setQuizAnswers([]);
    setQuizScore(0);
    setShowQuizResult(false);
    setQuizPassed(false);
    setRoleScores({ ...EMPTY_SCORES });
  };

  // Compute winning team(s) for role quiz result
  const getTopTeams = () => {
    const scores = finalRoleScoresRef.current;
    const maxScore = Math.max(...(Object.values(scores) as number[]));
    if (maxScore === 0) return [];
    return (Object.entries(scores) as [TeamKey, number][])
      .filter(([, v]) => v === maxScore)
      .map(([k]) => k);
  };

  // ─── Steps ──────────────────────────────────────────────────────────────

  const allSteps = [
    {
      id: 1,
      title: "Bài test văn hoá",
      desc: "Tìm hiểu giá trị cốt lõi tại NhiLe Team.",
      icon: <ClipboardCheck className="w-6 h-6" />,
      status: currentStep === 1 ? "active" : currentStep > 1 ? "completed" : "locked",
      customContent: (
        <div className="mt-6 space-y-4 transition-all duration-300">
          <p className="text-sm font-bold text-gray-600 leading-relaxed">
            Hãy dành 5 phút để đọc và tìm hiểu bài test văn hoá của NhiLe Team nhé.
          </p>
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-zoom-in" onClick={() => setIsImageFullscreen(true)}>
            <img src="https://lh3.googleusercontent.com/d/1dZvgi4ZLZoTD1-hGLeHStSO4v3J2CYzV" alt="Văn hoá NhiLe Team" className="w-full object-cover max-h-72 hover:scale-105 transition-transform duration-300" />
          </div>
          {activeQuizType === "culture" && quizAnswers.length > 0 && !showQuizResult && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-black text-gray-400 uppercase tracking-wider">
                <span>Đang làm dở</span>
                <span>{quizAnswers.length}/{cultureQuestions.length} câu — {Math.round((quizAnswers.length / cultureQuestions.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#6366F1] rounded-full transition-all duration-500" style={{ width: `${(quizAnswers.length / cultureQuestions.length) * 100}%` }} />
              </div>
            </div>
          )}
          <button onClick={() => openQuiz("culture")} className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
            {activeQuizType === "culture" && quizAnswers.length > 0 && !showQuizResult ? "Tiếp tục bài test" : "Làm bài test văn hoá"} <ArrowRight size={16} />
          </button>
        </div>
      ),
    },
    {
      id: 2,
      title: "Bài test tôi phù hợp làm gì",
      desc: "Khám phá team phù hợp nhất với bạn trong NhiLe Team.",
      icon: <BrainCircuit className="w-6 h-6" />,
      status: currentStep === 2 ? "active" : currentStep > 2 ? "completed" : "locked",
      customContent: (
        <div className="mt-6 space-y-4 transition-all duration-300">
          <p className="text-sm font-bold text-gray-600 leading-relaxed">
            20 câu hỏi ngắn sẽ giúp chúng mình hiểu bạn phù hợp với team nào nhất nhé!
          </p>
          <button onClick={() => openQuiz("role")} className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
            Bắt đầu bài test <ArrowRight size={16} />
          </button>
        </div>
      ),
    },
    {
      id: 3,
      title: "Đặt lịch phỏng vấn",
      desc: "Chọn thời gian phù hợp để gặp gỡ trao đổi trực tiếp nhé.",
      icon: <Calendar className="w-6 h-6" />,
      status: currentStep === 3 ? "active" : currentStep > 3 ? "completed" : "locked",
      customContent: (() => {
        // March 2026: day 1 = Sunday → offset = 0 empty cells before "1"
        const firstDayOfWeek = new Date(2026, 2, 1).getDay(); // 0 = Sun
        // Reorder so Monday=0 ... Sunday=6
        const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        const isAvailableDate = (d: number) => [2, 3, 5].includes(new Date(2026, 2, d).getDay()); // Tue=2,Wed=3,Fri=5

        return (
          <div className="mt-6 space-y-6 transition-all duration-300">
            <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Calendar */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-black text-sm text-[#1D1D1F] uppercase tracking-wider">Tháng 3, 2026</h4>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["T2","T3","T4","T5","T6","T7","CN"].map((d) => (
                      <span key={d} className="text-[10px] font-black text-gray-300 uppercase py-2">{d}</span>
                    ))}
                    {/* Empty offset cells */}
                    {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                      const available = isAvailableDate(date);
                      const isSelected = date === selectedDate;
                      return (
                        <button key={date} disabled={!available}
                          onClick={() => available && setSelectedDate(date)}
                          className={`aspect-square flex items-center justify-center rounded-xl text-xs font-black transition-all relative
                            ${isSelected ? "bg-[#3B82F6] text-white scale-110 z-10 shadow-lg shadow-blue-400/30"
                              : available ? "text-[#1D1D1F] hover:bg-blue-50 hover:text-[#3B82F6] cursor-pointer"
                              : "text-gray-200 cursor-not-allowed"}`}>
                          {date}
                          {isSelected && <div className="absolute inset-0 rounded-xl bg-blue-400/20 animate-ping" />}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold">✓ Thứ 3, Thứ 4, Thứ 6 hàng tuần</p>
                </div>
                {/* Time slots */}
                <div className="w-full lg:w-44 space-y-3">
                  <h4 className="font-black text-sm text-[#1D1D1F] uppercase tracking-wider">Khung giờ</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                    {["19:00","19:30","20:00","20:30"].map((t) => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className={`py-3 px-4 border rounded-xl text-sm font-black transition-all text-center
                          ${selectedTime === t
                            ? "bg-[#1D4ED8] text-white border-transparent shadow-md scale-105"
                            : "border-gray-100 text-[#1D1D1F] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-blue-50"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Confirm button */}
            <button
              disabled={!selectedDate || !selectedTime}
              onClick={() => { setCurrentStep(currentStep + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-sm transition-all w-full sm:w-auto
                ${selectedDate && selectedTime
                  ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
              <Send size={16} /> Xác nhận lịch hẹn
            </button>
          </div>
        );
      })(),
    },
    {
      id: 4,
      title: "Kết quả phỏng vấn",
      desc: "Kiểm tra email cá nhân thường xuyên để nhận kết quả nhé.",
      icon: <Video className="w-6 h-6" />,
      status: currentStep === 4 ? "active" : currentStep > 4 ? "completed" : "locked",
      customContent: (
        <div className="mt-6">
          {!isActiveMember && (
            <button onClick={() => { setCurrentStep(currentStep + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
              Tiếp tục <ArrowRight size={16} />
            </button>
          )}
        </div>
      ),
    },
    {
      id: 5,
      title: "Về nhà thôi!",
      desc: "Hoàn thiện hồ sơ cuối để chính thức bắt đầu hành trình.",
      icon: <PartyPopper className="w-6 h-6" />,
      status: currentStep === 5 ? "active" : currentStep > 5 ? "completed" : "locked",
      customContent: (
        <div className="mt-6 space-y-4">
          {/* Box 1: Điền thông tin cá nhân */}
          <button
            onClick={() => setShowProfileModal(true)}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${profileDone ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${profileDone ? "bg-green-500" : "bg-blue-100"}`}>
              {profileDone ? <CheckCircle2 size={20} className="text-white" /> : "📝"}
            </div>
            <div className="flex-1">
              <p className={`font-black text-sm ${profileDone ? "text-green-700" : "text-[#1D1D1F]"}`}>Điền thông tin cá nhân</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{profileDone ? "Đã hoàn thành" : "Nhấn để điền thông tin"}</p>
            </div>
          </button>

          {/* Box 2: Ký bảo mật */}
          <button
            onClick={() => { window.open("https://sg1.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBTVety-rac_6tDkmYwnVdmNmPWQbUwl3bv6r3XwaTnqMzGtFVh1dKVNBmCztFyBBo*", "_blank"); setSignDone(true); }}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${signDone ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${signDone ? "bg-green-500" : "bg-indigo-100"}`}>
              {signDone ? <CheckCircle2 size={20} className="text-white" /> : "✍️"}
            </div>
            <div className="flex-1">
              <p className={`font-black text-sm ${signDone ? "text-green-700" : "text-[#1D1D1F]"}`}>Ký bảo mật</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{signDone ? "Đã mở trang ký" : "Nhấn để ký cam kết bảo mật"}</p>
            </div>
          </button>

          {/* Screenshot upload */}
          {profileDone && signDone && (
            <label className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${screenshotFile ? "border-green-400 bg-green-50" : "border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50/50"}`}>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = (e.target as HTMLInputElement).files; setScreenshotFile(f?.[0] ?? null); }} />
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${screenshotFile ? "bg-green-500" : "bg-gray-100"}`}>
                {screenshotFile ? <CheckCircle2 size={20} className="text-white" /> : "📸"}
              </div>
              <div className="flex-1">
                <p className={`font-black text-sm ${screenshotFile ? "text-green-700" : "text-[#1D1D1F]"}`}>Gửi ảnh xác nhận</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{screenshotFile ? screenshotFile.name : "Chụp màn hình xác nhận ký & tải lên"}</p>
              </div>
            </label>
          )}

          {/* Hoàn thành button */}
          {profileDone && signDone && screenshotFile && !showChotDon && (
            <button
              onClick={() => setShowChotDon(true)}
              className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Hoàn thành 🎉
            </button>
          )}

          {/* Chốt đơn card */}
          {showChotDon && (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] p-8 rounded-[2.5rem] shadow-2xl shadow-purple-500/20 mt-2">
              <div className="absolute top-0 right-0 p-4 opacity-20"><PartyPopper size={120} /></div>
              <div className="relative z-10 space-y-6">
                <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">Chốt đơn! Thảo Nhi đã là một mẩu của NhiLe Team! 🥳</h4>
                <p className="text-white/80 text-sm sm:text-base font-medium leading-relaxed">Sẵn sàng nhé. Check email nhận 'bí kíp võ công' tham gia cùng anh em mình nha. 🚀</p>
                <button onClick={() => window.open("https://t.me/+your_group_link", "_blank")}
                  className="w-full bg-white text-[#1D4ED8] py-6 px-8 rounded-[2rem] font-black text-xl shadow-lg hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-4 group/btn">
                  BẮT ĐẦU HÀNH TRÌNH NGAY <Zap className="fill-current group-hover/btn:animate-bounce" size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  const ACTIVE_STEP_IDS = [1, 3, 4];
  const RETURNING_STEP_IDS = [1, 3, 4, 5];

  const returnTestStep = {
    id: 0,
    title: "Bài test quay trở lại",
    desc: "Hoàn thành bài test để tiếp tục hành trình cùng NhiLe Team.",
    icon: <ClipboardCheck className="w-6 h-6" />,
    status: "active",
    customContent: (
      <div className="mt-6 space-y-4">
        {returnTestResult === "fail" ? (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-medium text-gray-600 leading-relaxed">
              Cảm ơn bạn đã dành thời gian làm bài test và quan tâm quay lại với NhiLe Team. Sau khi kiểm tra kết quả, chỉ số hiện tại chưa phù hợp với yêu cầu để tham gia vòng phỏng vấn, vì vậy team chưa thể sắp xếp buổi phỏng vấn cho bạn trong thời điểm này.
            </p>
            <p className="text-sm font-medium text-gray-600 leading-relaxed">
              Team ghi nhận tinh thần chủ động và cách bạn hoàn thành bài làm. Bạn có thể đăng ký làm lại bài test sau 03 tháng. Chúc bạn có thêm nhiều trải nghiệm tích cực.
            </p>
          </div>
        ) : returnTestResult === "pass" ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
              <ClipboardCheck size={16} className="text-white" />
            </div>
            <p className="font-black text-sm text-green-700">Bài test đã hoàn thành — bạn đã đạt! 🎉</p>
          </div>
        ) : (
          <>
            {returnTestOpened && (() => {
              const phase = localStorage.getItem("nlt_rtq_phase");
              const mcAns: number[] = (() => { try { return JSON.parse(localStorage.getItem("nlt_rtq_mc_ans") || "[]"); } catch { return []; } })();
              const hasResult = !!localStorage.getItem("nlt_rtq_result");
              if (hasResult) return null;
              let label = "";
              let pct = 0;
              if (phase === "essay") { label = "Phần tự luận"; pct = 100; }
              else if (mcAns.length > 0) { label = `${mcAns.length}/20 câu — ${Math.round((mcAns.length / 20) * 100)}%`; pct = (mcAns.length / 20) * 100; }
              if (!label) return null;
              return (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-black text-gray-400 uppercase tracking-wider">
                    <span>Đang làm dở</span>
                    <span>{label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6366F1] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })()}
            <button
              onClick={() => { setReturnTestOpened(true); setShowReturnQuiz(true); }}
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              {returnTestOpened ? "Tiếp tục bài test" : "Bắt đầu bài test"} <ArrowRight size={16} />
            </button>
          </>
        )}
      </div>
    ),
  };

  const remap = (arr: typeof allSteps) =>
    arr.map((s, i) => ({ ...s, id: i + 1, status: currentStep === i + 1 ? "active" : currentStep > i + 1 ? "completed" : "locked" }));

  const steps = isActiveMember
    ? remap(allSteps.filter(s => ACTIVE_STEP_IDS.includes(s.id)))
    : isReturning
    ? remap([returnTestStep as typeof allSteps[0], ...allSteps.filter(s => RETURNING_STEP_IDS.includes(s.id))])
    : allSteps;

  // ─── Render helpers ──────────────────────────────────────────────────────

  const timerPercent = (timer / TIMER_SECONDS) * 100;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  const currentQuestion = activeQuizType === "role"
    ? { q: roleQuestions[currentQuestionIndex]?.q, options: roleQuestions[currentQuestionIndex]?.options }
    : { q: cultureQuestions[currentQuestionIndex]?.q, options: cultureQuestions[currentQuestionIndex]?.a.map((t) => ({ text: t })) };

  // ─── JSX ─────────────────────────────────────────────────────────────────

  return (
    <div className={`min-h-[100dvh] bg-[#F9F9F9] flex flex-col md:flex-row font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.webp" alt="NLT" className="w-8 h-8 object-contain" />
          <span className="font-black text-sm tracking-tight text-blue-600">NhiLe Team</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-500 hover:bg-gray-50 rounded-xl">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-0 z-[90] md:sticky md:top-0 md:flex md:w-80 bg-white border-r border-gray-100 p-8 flex-col justify-between h-screen transition-transform duration-500 ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"}`}>
        <div className="space-y-10">
          <div className="hidden md:flex flex-col items-center justify-center w-full">
            <img src="/logo.webp" alt="NLT" className="w-20 h-20 object-contain hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="space-y-6 pt-16 md:pt-0">
            <div className="flex items-center gap-4 p-5 bg-[#F9F9F9] rounded-[2rem] border border-gray-50">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 border border-gray-100 shrink-0"><User size={24} /></div>
              <h3 className="font-black text-sm text-[#1D1D1F] truncate uppercase">Thảo Nhi Lê</h3>
            </div>
            <nav>
              <div className="flex items-center gap-3 px-6 py-4 text-blue-600 bg-blue-50 rounded-2xl font-black text-sm border border-blue-100 cursor-default">
                <CheckCircle2 size={18} /> Onboarding
              </div>
            </nav>
          </div>
        </div>
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-all text-sm font-black mt-10 pb-8 md:pb-0">
          <LogOut size={18} /> Đăng xuất
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-5 sm:p-8 md:p-12 lg:p-16 overflow-y-auto overflow-x-hidden">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Chào mừng Thảo Nhi!</h2>
              <p className="text-gray-500 text-sm sm:text-base font-bold max-w-xl leading-relaxed mx-auto sm:mx-0">
                Chúng mình đã chuẩn bị sẵn mọi thứ — hoàn tất vài bước nhỏ để bắt đầu hành trình cùng <span className="text-blue-600">NhiLe Team</span> nha!
              </p>
            </div>
            <div className="flex-1 max-w-md w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.15em]">Tiến trình thành viên</span>
                </div>
                <span className="text-xs font-black text-blue-600">{currentStep === totalSteps ? "100" : Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <div className="h-4 w-full bg-blue-50 rounded-full overflow-hidden p-1 border border-blue-100/50">
                <div className="h-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] bg-[length:200%_100%] animate-shimmer transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
              </div>
            </div>
          </header>

          <div className="relative space-y-4">
            <div className="absolute left-[31px] sm:left-[35px] top-10 bottom-10 w-0.5 bg-gray-100 z-0" />
            {steps.map((step) => {
              const isActive = step.status === "active";
              return (
                <div key={step.id} className={`relative z-10 flex gap-5 sm:gap-8 p-6 sm:p-8 rounded-[2.5rem] transition-all duration-500 ${isActive ? "bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50" : "bg-transparent"}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-500
                    ${step.status === "completed" ? "bg-[#10B981] text-white"
                      : isActive ? step.id === 5 ? "bg-gradient-to-br from-[#FB923C] to-[#F59E0B] text-white ring-8 ring-orange-500/10 animate-bounce-subtle" : "bg-[#3B82F6] text-white ring-8 ring-blue-600/5 shadow-lg shadow-blue-500/20"
                      : "bg-white text-gray-200 border border-gray-100"}`}>
                    {step.status === "completed" ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                  </div>
                  <div className={`flex-1 space-y-1.5 pt-1 text-left transition-opacity duration-500 ${step.status === "locked" ? "opacity-30" : "opacity-100"}`}>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${step.status === "completed" ? "text-[#10B981]" : isActive ? "text-blue-600" : "text-gray-400"}`}>Bước {step.id}</span>
                    <h3 className={`text-lg font-black tracking-tight ${step.status === "locked" ? "text-gray-300" : "text-[#1D1D1F]"}`}>{step.title}</h3>
                    <p className={`text-xs sm:text-sm font-bold leading-relaxed ${step.status === "completed" ? "text-gray-400" : "text-gray-500"}`}>{step.desc}</p>
                    {isActive && step.customContent}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ─── Quiz Modal ─────────────────────────────────────────────────────── */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeQuiz} />
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">

            {!showQuizResult ? (
              <>
                {/* Question header */}
                <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-7 sm:p-8 space-y-3 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white/70 uppercase tracking-widest">
                      {activeQuizType === "culture" ? "Test Văn Hoá" : "Test Phù Hợp Team"}
                    </span>
                    <button onClick={closeQuiz} className="text-white/60 hover:text-white transition-colors"><X size={18} /></button>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                    {currentQuestion.q}
                  </h3>
                </div>

                {/* Timer */}
                <div className="px-7 sm:px-8 pt-4 shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Thời gian</span>
                    <span className={`text-xs font-black tabular-nums ${timer <= 10 ? "text-red-500" : "text-orange-500"}`}>
                      {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${timer <= 10 ? "bg-red-500" : "bg-gradient-to-r from-orange-400 to-yellow-400"}`} style={{ width: `${timerPercent}%` }} />
                  </div>
                </div>

                {/* Options */}
                <div className="px-7 sm:px-8 py-4 space-y-2 overflow-y-auto flex-1">
                  {currentQuestion.options?.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(idx)}
                      className="w-full flex items-center gap-3 p-3.5 border-2 border-gray-100 rounded-2xl font-bold text-sm text-[#1D1D1F] hover:border-[#6366F1] hover:bg-indigo-50 hover:text-[#6366F1] transition-all active:scale-[0.98] text-left">
                      <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 shrink-0">
                        {OPTION_LABELS[idx]}
                      </span>
                      {opt.text}
                    </button>
                  ))}
                </div>

                {/* Progress */}
                <div className="px-7 sm:px-8 pb-6 shrink-0 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    <span>Tiến trình</span>
                    <span>{currentQuestionIndex + 1}/{totalQuestions} câu — {progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6366F1] transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </>
            ) : (
              /* Result screen */
              <div className="p-10 sm:p-12 text-center space-y-6 overflow-y-auto">
                {activeQuizType === "culture" ? (
                  quizPassed ? (
                    <>
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-200">
                        <CheckCircle2 className="text-white w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-[#1D1D1F]">Tuyệt vời! 🎉</h3>
                        <p className="text-gray-500 font-bold">
                          Bạn đúng <span className="text-green-600 font-black">{quizScore}/{cultureQuestions.length}</span> câu — Đủ điều kiện sang bước tiếp theo!
                        </p>
                      </div>
                      <div className="flex justify-center gap-2">
                        {["-0.3s", "-0.15s", "0s"].map((d) => <div key={d} className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: d }} />)}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <XCircle className="text-red-500 w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-[#1D1D1F]">Chưa đạt!</h3>
                        <p className="text-gray-500 font-bold">
                          Bạn đúng <span className="text-red-500 font-black">{quizScore}/{cultureQuestions.length}</span> câu — Cần đúng ít nhất <span className="font-black text-[#1D1D1F]">{PASS_SCORE}/{cultureQuestions.length}</span> để qua.
                        </p>
                        <p className="text-gray-400 text-sm">Hãy đọc lại tài liệu và thử lại nhé!</p>
                      </div>
                      <button onClick={handleRetry} className="flex items-center gap-2 mx-auto bg-[#6366F1] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all">
                        <RotateCcw size={16} /> Làm lại
                      </button>
                    </>
                  )
                ) : (
                  /* Role quiz result */
                  (() => {
                    const topTeams = getTopTeams();
                    const isMultiple = topTeams.length > 1;
                    return (
                      <>
                        <div className="space-y-3">
                          <div className="text-4xl">{isMultiple ? "🌟" : TEAM_INFO[topTeams[0]]?.emoji}</div>
                          <h3 className="text-xl font-black text-[#1D1D1F]">
                            {isMultiple ? "Bạn phù hợp với nhiều team!" : `Bạn phù hợp với ${TEAM_INFO[topTeams[0]]?.label}!`}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {topTeams.map((team) => (
                            <div key={team} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-left">
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-xl">{TEAM_INFO[team].emoji}</span>
                                <span className="font-black text-[#1D1D1F] text-sm">{TEAM_INFO[team].label}</span>
                                              </div>
                              <p className="text-xs text-gray-500 font-medium pl-9">{TEAM_INFO[team].desc}</p>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => { closeQuiz(); setCurrentStep(currentStep + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="flex items-center gap-2 mx-auto bg-[#6366F1] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all"
                        >
                          Tiếp tục <ArrowRight size={16} />
                        </button>
                      </>
                    );
                  })()
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen image lightbox */}
      {isImageFullscreen && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsImageFullscreen(false)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10">
            <X size={32} />
          </button>
          <img
            src="https://lh3.googleusercontent.com/d/1dZvgi4ZLZoTD1-hGLeHStSO4v3J2CYzV"
            alt="Văn hoá NhiLe Team"
            className="max-w-full max-h-full object-contain rounded-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => { e.stopPropagation(); }}
          />
        </div>
      )}

      {/* Return Member Quiz Modal — always mounted to preserve state on close */}
      <ReturnMemberQuizModal
        isOpen={showReturnQuiz}
        onPass={() => { setReturnTestResult("pass"); setCurrentStep(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        onFail={() => setReturnTestResult("fail")}
        onClose={() => setShowReturnQuiz(false)}
      />

      {/* Profile Info Modal */}
      {showProfileModal && (
        <ProfileInfoModal
          onClose={() => setShowProfileModal(false)}
          onSubmit={() => setProfileDone(true)}
        />
      )}

      <style>{`
        .overflow-y-auto::-webkit-scrollbar { display: none; }
        .overflow-y-auto { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Dashboard;
