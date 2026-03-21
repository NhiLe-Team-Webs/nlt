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
  BookOpen,
  ChevronLeft,
  FileText,
  Target,
  MessageCircle,
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
  const totalSteps = isActiveMember ? 3 : isReturning ? 6 : 5;

  const [currentStep, setCurrentStep] = useState(() =>
    (location.state?.userType || "new") === "returning"
      ? parseInt(localStorage.getItem("nlt_rt_step") || "1")
      : 1
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const openLightbox = (src: string) => setLightboxSrc(src);
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
  const [isStep5ModalOpen, setIsStep5ModalOpen] = useState(false);
  const [step5View, setStep5View] = useState<"menu" | "profile">("menu");
  const [step5ProfileForm, setStep5ProfileForm] = useState({ name: "", cungSun: "", username: "", cungMoon: "", gmail: "", cungMoc: "", ngaySinh: "", soChudao: "", sdt: "", soLinhHon: "", linkFb: "", soTruongThanh: "", linkLinkedIn: "", diaChi: "", thietBi: "" });

  // Per-question timer
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // New UI states
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docModalView, setDocModalView] = useState<"menu" | "video" | "text">("menu");
  const [showStepModal, setShowStepModal] = useState(false);
  const [stepModalContext, setStepModalContext] = useState<"quiz" | "calendar" | "interview-result" | "active-culture" | "active-calendar" | "return-pass">("quiz");
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Chào bạn! Bạn cần hỗ trợ gì trong quá trình Onboarding không? 😊" },
  ]);
  const [roleAnswers, setRoleAnswers] = useState<number[]>([]);

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
    setSelectedAnswer(null);
    setRoleAnswers([]);
    setIsQuizModalOpen(true);
  };

  const handleQuizContinue = () => {
    closeQuiz();
    if (isActiveMember && activeQuizType === "culture") {
      setStepModalContext("active-culture");
    } else {
      setStepModalContext("quiz");
    }
    setShowStepModal(true);
  };

  const handleStepModalContinue = () => {
    setShowStepModal(false);
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      setRoleAnswers(prev => [...prev, idx]);
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
    setRoleAnswers([]);
    finalRoleScoresRef.current = { ...EMPTY_SCORES };
  };

  const handleCultureBack = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex(prev => prev - 1);
    setQuizAnswers(prev => prev.slice(0, -1));
    setSelectedAnswer(null);
  };

  const handleRoleBack = () => {
    if (currentQuestionIndex === 0) return;
    const prevIdx = currentQuestionIndex - 1;
    const prevAnswer = roleAnswers[prevIdx];
    const prevScoring = roleQuestions[prevIdx].options[prevAnswer].scores;
    const newScores = { ...roleScores };
    for (const [team, pts] of Object.entries(prevScoring)) {
      newScores[team as TeamKey] = (newScores[team as TeamKey] || 0) - (pts as number);
    }
    setRoleScores(newScores);
    setRoleAnswers(prev => prev.slice(0, -1));
    setCurrentQuestionIndex(prevIdx);
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
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const isAvailableDate = (d: number) => { const dt = new Date(2026, 2, d); return [2, 3, 5].includes(dt.getDay()) && dt >= today; }; // Tue=2,Wed=3,Fri=5

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
      title: "Đợi kết quả phỏng vấn",
      desc: "Kiểm tra email thường xuyên.",
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
      desc: "Hoàn thiện hồ sơ cuối cùng. Hãy kiểm tra email thường xuyên.",
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
  const RETURNING_STEP_IDS = [1, 2, 3, 4, 5];

  const returnTestStep = {
    id: 0,
    title: "Thử thách trở lại",
    desc: "Đánh giá mức độ phù hợp cơ bản.",
    icon: <Target className="w-6 h-6" />,
    status: "active",
    customContent: (
      <div className="mt-6 space-y-4">
        {returnTestResult === "fail" ? (() => {
          const failTime = parseInt(localStorage.getItem("nlt_rtq_fail_time") || "0");
          const unlockDate = failTime ? new Date(failTime + 3 * 30 * 24 * 60 * 60 * 1000) : null;
          const isLocked = !!unlockDate && new Date() < unlockDate;
          const unlockStr = unlockDate ? unlockDate.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
          return (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4">
              <p className="text-sm font-medium text-gray-600 leading-relaxed">
                Cảm ơn bạn đã dành thời gian làm bài test và quan tâm quay lại với NhiLe Team. Sau khi kiểm tra kết quả, chỉ số hiện tại chưa phù hợp với yêu cầu để tham gia vòng phỏng vấn, vì vậy team chưa thể sắp xếp buổi phỏng vấn cho bạn trong thời điểm này.
              </p>
              {isLocked ? (
                <>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">
                    Team ghi nhận tinh thần chủ động và cách bạn hoàn thành bài làm. Bạn có thể đăng ký làm lại bài test sau <span className="font-black text-[#1D1D1F]">03 tháng</span> kể từ khi làm bài. Chúc bạn có thêm nhiều trải nghiệm tích cực.
                  </p>
                  <p className="text-sm font-black text-purple-600">Ngày mở khóa: {unlockStr}</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">
                    Đừng nản nhé! Bạn có thể làm lại ngay bây giờ.
                  </p>
                  <button
                    onClick={() => {
                      ["nlt_rt_result","nlt_rtq_phase","nlt_rtq_mc_ans","nlt_rtq_essay_ans","nlt_rtq_result","nlt_rtq_fail_time"].forEach(k => localStorage.removeItem(k));
                      setReturnTestResult("none");
                      setReturnTestOpened(true);
                      setShowReturnQuiz(true);
                    }}
                    className="btn-pop w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                  >
                    <RotateCcw size={16} /> Làm lại ngay
                  </button>
                </>
              )}
            </div>
          );
        })()
        : returnTestResult === "pass" ? (
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
    <div className={`min-h-[100dvh] flex font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="NhiLe Team" className="w-8 h-8 rounded-full object-contain shrink-0" />
          <span className="font-black text-sm text-gray-900"><span className="text-purple-600">NHILE</span>TEAM</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-500 hover:bg-gray-50 rounded-xl">
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-0 z-[90] md:relative md:flex md:w-64 lg:w-72 bg-white border-r border-gray-100 p-6 flex-col h-screen md:sticky md:top-0 transition-transform duration-500 ${isMobileMenuOpen ? "flex translate-y-0" : "-translate-y-full md:translate-y-0"}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 pt-4 md:pt-0">
          <img src="/logo.svg" alt="NhiLe Team" className="w-10 h-10 rounded-full object-contain shrink-0" />
          <span className="font-black text-gray-900 text-sm"><span className="text-purple-600">NHILE</span>TEAM</span>
        </div>

        {/* Step list */}
        <nav className="flex-1 space-y-1">
          {steps.map((step) => {
            const isCompleted = step.status === "completed";
            const isActive = step.status === "active";
            return (
              <div key={step.id} className="flex items-center gap-3 px-1 py-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black transition-all duration-300 ${isCompleted ? "bg-green-500 text-white" : isActive ? "bg-purple-600 text-white" : "border-2 border-gray-200 text-gray-400"}`}>
                  {isCompleted ? <CheckCircle2 size={13} /> : step.id}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wide leading-tight transition-colors ${isActive ? "text-purple-600" : isCompleted ? "text-gray-600" : "text-gray-300"}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="space-y-1 mt-6 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 px-1 py-1.5">
            <User size={15} className="shrink-0 text-gray-400" />
            <span className="font-bold text-xs text-gray-500 uppercase tracking-wide truncate">Thảo Nhi Lê</span>
          </div>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 px-1 py-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors font-black">
            <LogOut size={15} className="shrink-0" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-6 md:p-10 min-h-screen">
        {/* Header */}
        <div className="text-center mb-8 max-w-md">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Chào mừng Thảo Nhi!</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base leading-relaxed">
            Cùng hoàn tất một vài bước nhỏ đây thú vị để gia nhập đội ngũ NhiLe Team nhé.
          </p>
        </div>

        {/* Current step card */}
        {(() => {
          const activeStep = steps.find(s => s.status === "active");
          if (!activeStep) return (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full shadow-lg border border-white/60 text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-purple-500">
                <PartyPopper className="w-6 h-6" />
              </div>
              <p className="text-center text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-1.5">BƯỚC {totalSteps}</p>
              <h2 className="text-center text-2xl font-black text-gray-900 mb-1.5">Về nhà thôi!</h2>
              <p className="text-center text-gray-500 text-sm leading-relaxed">Hoàn thiện hồ sơ cuối cùng. Hãy kiểm tra email thường xuyên.</p>
            </div>
          );
          return (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full shadow-lg border border-white/60">
              {/* Icon */}
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-purple-500">
                {activeStep.icon}
              </div>
              {/* Label */}
              <p className="text-center text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-1.5">BƯỚC {activeStep.id}</p>
              {/* Title */}
              <h2 className="text-center text-2xl font-black text-gray-900 mb-1.5">{activeStep.title}</h2>
              {/* Desc */}
              <p className="text-center text-gray-500 text-sm mb-6 leading-relaxed">{activeStep.desc}</p>

              {/* CTA dựa theo tên bước, không dựa theo ID (ID thay đổi theo flow) */}
              {activeStep.title === "Bài test văn hoá" ? (
                <div className="space-y-3">
                  <button
                    onClick={() => { setIsDocModalOpen(true); setDocModalView("menu"); }}
                    className="btn-pop w-full flex items-center justify-center gap-2 py-3 px-4 border border-purple-200 rounded-2xl text-purple-600 font-bold text-sm hover:bg-purple-50 transition-colors"
                  >
                    <BookOpen size={15} /> Đọc tài liệu Văn hoá trước khi Test
                  </button>
                  <button
                    onClick={() => openQuiz("culture")}
                    className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                  >
                    Bắt đầu thực hiện <ArrowRight size={16} />
                  </button>
                </div>
              ) : activeStep.title === "Thử thách trở lại" ? (
                returnTestResult === "fail" ? (() => {
                  const failTime = parseInt(localStorage.getItem("nlt_rtq_fail_time") || "0");
                  const unlockDate = failTime ? new Date(failTime + 3 * 30 * 24 * 60 * 60 * 1000) : null;
                  const isLocked = !!unlockDate && new Date() < unlockDate;
                  const unlockStr = unlockDate ? unlockDate.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
                  return isLocked ? (
                    <div className="space-y-2 text-center">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Bạn có thể đăng ký làm lại bài test sau <span className="font-black text-[#1D1D1F]">03 tháng</span> kể từ khi làm bài.
                      </p>
                      <p className="text-sm font-black text-purple-600">Ngày mở khóa: {unlockStr}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500 leading-relaxed text-center">
                        Đừng nản nhé! Bạn có thể làm lại ngay bây giờ.
                      </p>
                      <button
                        onClick={() => {
                          ["nlt_rt_result","nlt_rtq_phase","nlt_rtq_mc_ans","nlt_rtq_essay_ans","nlt_rtq_result","nlt_rtq_fail_time"].forEach(k => localStorage.removeItem(k));
                          setReturnTestResult("none");
                          setReturnTestOpened(true);
                          setShowReturnQuiz(true);
                        }}
                        className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                      >
                        <RotateCcw size={16} /> Làm lại ngay
                      </button>
                    </div>
                  );
                })() : (
                  <button
                    onClick={() => { setReturnTestOpened(true); setShowReturnQuiz(true); }}
                    className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                  >
                    {returnTestOpened ? "Tiếp tục bài test" : "Bắt đầu thực hiện"} <ArrowRight size={16} />
                  </button>
                )
              ) : activeStep.title === "Bài test tôi phù hợp làm gì" ? (
                <button
                  onClick={() => openQuiz("role")}
                  className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                >
                  Bắt đầu thực hiện <ArrowRight size={16} />
                </button>
              ) : activeStep.title === "Đặt lịch phỏng vấn" ? (
                <button
                  onClick={() => setIsCalendarModalOpen(true)}
                  className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                >
                  Bắt đầu thực hiện <ArrowRight size={16} />
                </button>
              ) : activeStep.title === "Đợi kết quả phỏng vấn" ? (
                <button
                  onClick={() => { setStepModalContext("interview-result"); setShowStepModal(true); }}
                  className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                >
                  Bắt đầu thực hiện <ArrowRight size={16} />
                </button>
              ) : activeStep.title === "Về nhà thôi!" ? (
                <button
                  onClick={() => { setIsStep5ModalOpen(true); setStep5View("menu"); }}
                  className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                >
                  Bắt đầu thực hiện <ArrowRight size={16} />
                </button>
              ) : (
                <div className="border-t border-gray-100 pt-6">
                  {activeStep.customContent}
                </div>
              )}
            </div>
          );
        })()}
      </main>

      {/* ─── Document Modal ──────────────────────────────────────────────────── */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm overlay-in" onClick={() => setIsDocModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[1.5rem] shadow-2xl modal-pop">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {docModalView !== "menu" ? (
                  <button onClick={() => setDocModalView("menu")} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs font-bold">
                    <ChevronLeft size={14} /> Quay lại
                  </button>
                ) : (
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">TÀI LIỆU</span>
                )}
              </div>
              <button onClick={() => { setIsDocModalOpen(false); setDocModalView("menu"); }} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            {docModalView === "menu" && (
              <div className="p-6 space-y-4">
                <h3 className="text-center text-lg font-black text-gray-900">Bạn muốn xem tài liệu nào?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDocModalView("video")}
                    className="flex flex-col items-center gap-2.5 p-5 border border-gray-100 bg-gray-50 rounded-2xl hover:border-purple-200 hover:bg-purple-50 transition-colors"
                  >
                    <Video size={26} className="text-purple-600" />
                    <span className="text-sm font-bold text-purple-600">Xem Video</span>
                  </button>
                  <button
                    onClick={() => setDocModalView("text")}
                    className="flex flex-col items-center gap-2.5 p-5 border border-gray-100 bg-gray-50 rounded-2xl hover:border-purple-200 hover:bg-purple-50 transition-colors"
                  >
                    <FileText size={26} className="text-purple-600" />
                    <span className="text-sm font-bold text-purple-600">Đọc Văn Bản</span>
                  </button>
                </div>
              </div>
            )}
            {docModalView === "video" && (
              <div className="p-4">
                <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-sm font-medium">
                  [Video Của Team Sẽ Hiện Ở Đây]
                </div>
              </div>
            )}
            {docModalView === "text" && (
              <div className="p-6 max-h-72 overflow-y-auto">
                <h3 className="font-black text-gray-900 mb-3 text-base">Giá trị cốt lõi NhiLe Team</h3>
                <ol className="space-y-2.5 text-sm text-gray-600">
                  <li>1. Luôn đúng giờ và chủ động báo cáo tiến độ.</li>
                  <li>2. Góp ý thẳng thắn, mang tính xây dựng vì mục tiêu chung.</li>
                  <li>3. Bảo mật tuyệt đối các thông tin dự án chưa public.</li>
                  <li className="text-gray-400 italic text-xs mt-2">(Nội dung văn bản chi tiết sẽ được thêm vào đây...)</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Quiz Modal ─────────────────────────────────────────────────────── */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm overlay-in" onClick={closeQuiz} />
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden modal-pop max-h-[90vh] flex flex-col">

            {!showQuizResult ? (
              activeQuizType === "role" ? (
                /* ── Role quiz: auto-advance, back button, no timer ── */
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">GỢI Ý TEAM</span>
                    <button onClick={closeQuiz} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
                  </div>

                  {/* Progress */}
                  <div className="px-6 pt-4 shrink-0 space-y-2">
                    <span className="text-sm font-black text-gray-700">CÂU {currentQuestionIndex + 1} / {totalQuestions}</span>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="px-6 py-4 shrink-0">
                    <h3 className="text-base md:text-lg font-black text-gray-900 leading-snug">{currentQuestion.q}</h3>
                  </div>

                  {/* Options — click = auto advance */}
                  <div className="px-6 space-y-2 overflow-y-auto flex-1">
                    {currentQuestion.options?.map((opt, idx) => (
                      <button key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full flex items-center gap-3 p-3.5 border-2 border-gray-100 rounded-2xl text-sm text-left text-gray-700 hover:border-purple-400 hover:bg-purple-50 active:scale-[0.98] transition-all">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
                        <span className="font-medium">{opt.text}</span>
                      </button>
                    ))}
                  </div>

                  {/* Back button from question 2+ */}
                  <div className="px-6 pb-5 pt-3 shrink-0">
                    {currentQuestionIndex > 0 && (
                      <button onClick={handleRoleBack}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 font-bold transition-colors">
                        <ChevronLeft size={16} /> Quay lại câu trước
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* ── Culture quiz: timer, select + confirm ── */
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TEST VĂN HOÁ</span>
                    <button onClick={closeQuiz} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
                  </div>

                  {/* Timer */}
                  <div className="px-6 pt-4 shrink-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-gray-700">CÂU {currentQuestionIndex + 1} / {totalQuestions}</span>
                      <span className={`text-sm font-black flex items-center gap-1.5 ${timer <= 10 ? "text-red-500" : "text-orange-500"}`}>
                        ⏱ 0:{String(timer % 60).padStart(2, "0")}s
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${timer <= 10 ? "bg-red-500" : "bg-orange-400"}`} style={{ width: `${timerPercent}%` }} />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="px-6 py-4 shrink-0">
                    <h3 className="text-base md:text-lg font-black text-gray-900 leading-snug">{currentQuestion.q}</h3>
                  </div>

                  {/* Options */}
                  {(() => {
                    const isLast = currentQuestionIndex === cultureQuestions.length - 1;
                    return (
                      <div className="px-6 space-y-2 overflow-y-auto flex-1">
                        {currentQuestion.options?.map((opt, idx) => (
                          <button key={idx}
                            onClick={() => isLast ? setSelectedAnswer(idx) : handleAnswer(idx)}
                            className={`w-full flex items-center gap-3 p-3.5 border-2 rounded-2xl text-sm text-left transition-all active:scale-[0.98]
                              ${isLast && selectedAnswer === idx
                                ? "border-purple-500 bg-purple-50 text-purple-900"
                                : "border-gray-100 text-gray-700 hover:border-purple-400 hover:bg-purple-50"}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isLast && selectedAnswer === idx ? "border-purple-600" : "border-gray-300"}`}>
                              {isLast && selectedAnswer === idx && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                            </div>
                            <span className="font-medium">{opt.text}</span>
                          </button>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Bottom: back button + progress + nộp bài */}
                  <div className="px-6 pb-5 pt-3 shrink-0 space-y-3">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      {currentQuestionIndex > 0 ? (
                        <button onClick={handleCultureBack}
                          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 font-bold transition-colors shrink-0">
                          <ChevronLeft size={16} /> Quay lại
                        </button>
                      ) : <div />}
                      {currentQuestionIndex === cultureQuestions.length - 1 && (
                        <button
                          disabled={selectedAnswer === null}
                          onClick={() => { if (selectedAnswer !== null) { handleAnswer(selectedAnswer); setSelectedAnswer(null); } }}
                          className={`px-8 py-2.5 rounded-2xl font-black text-sm transition-all ${selectedAnswer !== null ? "bg-purple-600 text-white shadow-lg hover:bg-purple-700 active:scale-95" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                          Nộp bài
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )
            ) : (
              /* Result screen */
              <div className="p-8 md:p-10 text-center space-y-5 overflow-y-auto">
                {activeQuizType === "culture" ? (
                  quizPassed ? (
                    <>
                      <div className="text-5xl icon-float">🤩</div>
                      <div className="space-y-1.5">
                        <h3 className="text-2xl font-black text-gray-900">Xuất sắc luôn!</h3>
                        <p className="text-gray-500 text-sm font-medium">Dữ vậy ta, làm lần đầu mà đúng luôn kìa, giỏi thiệt á chứ.</p>
                      </div>
                      <button onClick={handleQuizContinue} className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-sm shadow-lg hover:bg-green-600 active:scale-95 transition-all">
                        Tiếp tục hành trình
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl icon-shake">😭</div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-gray-900">Chưa đạt rồi!</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                          Đời mà ai không té, té thì đứng lên thôi. Ngại gì mà không làm lại, mình đọc tài liệu lại rồi chiến lại thôi nè.
                        </p>
                      </div>
                      <button onClick={handleRetry} className="btn-pop w-full py-4 rounded-2xl bg-purple-600 text-white font-black text-sm shadow-lg hover:bg-purple-700 flex items-center justify-center gap-2">
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
                        <div className="text-5xl icon-float">🥰</div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-black text-gray-900">Lựa chọn tuyệt vời!</h3>
                          {isMultiple ? (
                            <>
                              <div className="flex flex-wrap gap-2 justify-center">
                                {topTeams.map(t => (
                                  <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-black shadow-md shadow-purple-300/40">
                                    {TEAM_INFO[t]?.emoji} {TEAM_INFO[t]?.label}
                                  </span>
                                ))}
                              </div>
                              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                Bạn phù hợp với nhiều team. Team nào cũng hay hết, tụi mình đang nóng lòng chờ bạn gia nhập đó!
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-center">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-base font-black shadow-lg shadow-purple-300/40 icon-pulse-scale">
                                  {TEAM_INFO[topTeams[0]]?.emoji} {TEAM_INFO[topTeams[0]]?.label}
                                </span>
                              </div>
                              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                Chúc mừng bạn đã hoàn thành! Đây là team phù hợp nhất với bạn. Team nào cũng hay hết, tụi mình đang nóng lòng chờ bạn gia nhập đó!
                              </p>
                            </>
                          )}
                        </div>
                        <button onClick={handleQuizContinue} className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-sm shadow-lg hover:bg-green-600 active:scale-95 transition-all">
                          Tiếp tục hành trình
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

      {/* ─── Step Complete Modal ─────────────────────────────────────────────── */}
      {showStepModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm overlay-in" />
          <div className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl text-center space-y-4 modal-pop">
            {stepModalContext === "active-culture" ? (
              <>
                <div className="text-5xl icon-spin-pop">⭐</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">Chúc mừng bạn!</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    Bạn đã vượt qua bài test văn hóa một cách xuất sắc! Hãy tiếp tục chọn một khung giờ phù hợp để chúng mình có thể trò chuyện trực tiếp nha.
                  </p>
                </div>
                <button onClick={handleStepModalContinue} className="w-full py-4 rounded-2xl bg-purple-600 text-white font-black text-sm shadow-lg hover:bg-purple-700 active:scale-95 transition-all">
                  Đi tiếp thôi nào!
                </button>
              </>
            ) : stepModalContext === "return-pass" ? (
              <>
                <div className="text-5xl icon-float">🎉</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">Chào mừng trở lại!</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    Chào mừng bạn quay trở lại một lần nữa! Thật tuyệt vời khi thấy sự kiên trì và dũng cảm của bạn. Bạn đã vượt qua thử thách cực kỳ xuất sắc. Không còn nhiều nữa đâu, mình luôn đồng hành cùng bạn!
                  </p>
                </div>
                <button onClick={handleStepModalContinue} className="w-full py-4 rounded-2xl bg-purple-600 text-white font-black text-sm shadow-lg hover:bg-purple-700 active:scale-95 transition-all">
                  Đi tiếp thôi nào!
                </button>
              </>
            ) : stepModalContext === "active-calendar" ? (
              <>
                <div className="text-5xl icon-float">🎉</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">Tuyệt vời quá!</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    Bạn đã đặt lịch thành công! Thật háo hức được gặp bạn. Hãy kiểm tra email thường xuyên để nhận thông tin chi tiết về buổi phỏng vấn nhé. Tụi mình chờ bạn!
                  </p>
                </div>
                <button onClick={handleStepModalContinue} className="w-full py-4 rounded-2xl bg-purple-600 text-white font-black text-sm shadow-lg hover:bg-purple-700 active:scale-95 transition-all">
                  Hoàn tất
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl icon-float">🎉</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">{stepModalContext === "interview-result" ? "Hoàn thành!" : "Chúc mừng!"}</h3>
                  {stepModalContext === "calendar" ? (
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                      Sắp xong rồi nè! Thật tuyệt vời khi thấy sự tâm huyết của bạn. Chỉ còn một xíu nữa thôi, mình luôn ở đây cổ vũ bạn! Bạn kiểm tra email để nhận được các thông tin về buổi gặp mặt với chúng mình sắp tới nhé.
                    </p>
                  ) : stepModalContext === "interview-result" ? (
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                      Bạn đang làm rất tốt, cứ giữ vững tinh thần này nhé!
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                      Wow thật tuyệt vời, bạn đi được {currentStep} bước rồi nè! Thật là hạnh phúc khi thấy bạn dũng cảm đi được bước đầu tiên. Không còn nhiều nữa đâu, chỉ {totalSteps - currentStep} bước nữa là tới đích rồi. Mình luôn đồng hành cùng bạn!
                    </p>
                  )}
                </div>
                <button onClick={handleStepModalContinue} className="w-full py-4 rounded-2xl bg-purple-600 text-white font-black text-sm shadow-lg hover:bg-purple-700 active:scale-95 transition-all">
                  {stepModalContext === "interview-result" ? "Hoàn tất" : "Đi tiếp thôi nào!"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ─── Step 5 Modal ────────────────────────────────────────────────────── */}
      {isStep5ModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm overlay-in" onClick={() => setIsStep5ModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl modal-pop overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                {step5View === "profile" ? (
                  <button onClick={() => setStep5View("menu")} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs font-bold">
                    <ChevronLeft size={14} /> Quay lại
                  </button>
                ) : (
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">GIAO DIỆN TƯƠNG TÁC</span>
                )}
              </div>
              <button onClick={() => setIsStep5ModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Menu view */}
            {step5View === "menu" && (
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <h3 className="text-center text-lg font-black text-gray-900">Hoàn thiện hồ sơ cá nhân</h3>

                {/* Row 1: Điền thông tin */}
                <button onClick={() => setStep5View("profile")}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${profileDone ? "border-green-300 bg-green-50" : "border-gray-100 hover:border-purple-200 hover:bg-purple-50/30"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${profileDone ? "bg-green-500" : "bg-purple-50"}`}>
                    {profileDone ? <CheckCircle2 size={18} className="text-white" /> : <User size={18} className="text-purple-500" />}
                  </div>
                  <span className={`font-black text-sm flex-1 ${profileDone ? "text-green-700" : "text-gray-800"}`}>Điền thông tin cá nhân</span>
                  {!profileDone && <ArrowRight size={16} className="text-gray-400" />}
                </button>

                {/* Row 2: Ký bảo mật */}
                <button
                  onClick={() => { window.open("https://sg1.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBTVety-rac_6tDkmYwnVdmNmPWQbUwl3bv6r3XwaTnqMzGtFVh1dKVNBmCztFyBBo*", "_blank"); setSignDone(true); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${signDone ? "border-green-300 bg-green-50" : "border-gray-100 hover:border-purple-200 hover:bg-purple-50/30"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${signDone ? "bg-green-500" : "bg-purple-50"}`}>
                    {signDone ? <CheckCircle2 size={18} className="text-white" /> : "✍️"}
                  </div>
                  <span className={`font-black text-sm flex-1 ${signDone ? "text-green-700" : "text-gray-800"}`}>Ký bảo mật</span>
                  {!signDone && (
                    <span className="text-xs font-black text-purple-500 border border-purple-200 rounded-lg px-2 py-1 bg-purple-50">ấn</span>
                  )}
                </button>

                {/* Row 3: Upload photo */}
                <div className={`rounded-2xl border-2 overflow-hidden transition-all ${screenshotFile ? "border-green-300 bg-green-50" : "border-gray-100"}`}>
                  <div className="flex items-center gap-4 p-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${screenshotFile ? "bg-green-500" : "bg-green-50"}`}>
                      {screenshotFile ? <CheckCircle2 size={18} className="text-white" /> : "☁️"}
                    </div>
                    <span className={`font-black text-sm flex-1 ${screenshotFile ? "text-green-700" : "text-gray-800"}`}>Gửi ảnh xác nhận ký NDA</span>
                  </div>

                  {/* Example images: correct vs incorrect */}
                  <div className="mx-4 mb-3 grid grid-cols-2 gap-3">
                    {/* Correct */}
                    <div className="relative rounded-xl overflow-hidden cursor-zoom-in" onClick={() => openLightbox("/nda-correct.png")}>
                      <img src="/nda-correct.png" alt="Ảnh đúng" className="w-full h-28 object-cover" />
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-none stroke-white stroke-[3] stroke-round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-green-500/80 py-1 text-center">
                        <span className="text-white text-[10px] font-black">ĐÚNG</span>
                      </div>
                    </div>
                    {/* Incorrect */}
                    <div className="relative rounded-xl overflow-hidden cursor-zoom-in" onClick={() => openLightbox("/nda-wrong.png")}>
                      <img src="/nda-wrong.png" alt="Ảnh sai" className="w-full h-28 object-cover" />
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shadow-md">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-[3]">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-red-500/80 py-1 text-center">
                        <span className="text-white text-[10px] font-black">SAI</span>
                      </div>
                    </div>
                  </div>

                  <label className="block mx-4 mb-4 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 hover:bg-purple-50/30 transition-all text-center">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = (e.target as HTMLInputElement).files; setScreenshotFile(f?.[0] ?? null); }} />
                    <p className="text-sm text-gray-400 font-medium">{screenshotFile ? screenshotFile.name : "Nhấn để tải ảnh lên"}</p>
                  </label>
                </div>

                {/* Submit */}
                <button
                  disabled={!profileDone || !signDone || !screenshotFile}
                  onClick={() => { setIsStep5ModalOpen(false); setCurrentStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`btn-pop w-full py-4 rounded-2xl font-black text-sm transition-all ${profileDone && signDone && screenshotFile ? "bg-purple-600 text-white shadow-lg hover:bg-purple-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                  Hoàn tất Gửi Hồ Sơ
                </button>
              </div>
            )}

            {/* Profile form sub-view */}
            {step5View === "profile" && (
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="px-6 pt-4 pb-1 shrink-0">
                  <h3 className="text-lg font-black text-gray-900">Điền thông tin cá nhân</h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Thông tin của bạn sẽ được bảo mật</p>
                </div>
                <div className="overflow-y-auto flex-1 px-6 py-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {[
                      { label: "Họ và tên", key: "name" },
                      { label: "Cung Sun", key: "cungSun" },
                      { label: "Username", key: "username" },
                      { label: "Cung Moon", key: "cungMoon" },
                      { label: "Gmail NhiLe Team", key: "gmail" },
                      { label: "Cung Mộc", key: "cungMoc" },
                      { label: "Số chủ đạo", key: "soChudao" },
                      { label: "SĐT", key: "sdt" },
                      { label: "Số linh hồn", key: "soLinhHon" },
                      { label: "Link FB", key: "linkFb" },
                      { label: "Số trưởng thành", key: "soTruongThanh" },
                    ].reduce<JSX.Element[]>((acc, { label, key }, i, arr) => {
                      if (i % 2 === 1) return acc;
                      const right = arr[i + 1];
                      acc.push(
                        <div key={key} className="space-y-1">
                          <label className="text-xs font-bold text-gray-600">{label}</label>
                          <input value={step5ProfileForm[key as keyof typeof step5ProfileForm]} onChange={e => setStep5ProfileForm(prev => ({ ...prev, [key]: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                        </div>
                      );
                      if (key === "soChudao") {
                        acc.push(
                          <div key="ngaySinh" className="space-y-1">
                            <label className="text-xs font-bold text-gray-600">Ngày sinh</label>
                            <input type="date" value={step5ProfileForm.ngaySinh} onChange={e => setStep5ProfileForm(prev => ({ ...prev, ngaySinh: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                          </div>
                        );
                        return acc;
                      }
                      if (right) {
                        acc.push(
                          <div key={right.key} className="space-y-1">
                            <label className="text-xs font-bold text-gray-600">{right.label}</label>
                            <input value={step5ProfileForm[right.key as keyof typeof step5ProfileForm]} onChange={e => setStep5ProfileForm(prev => ({ ...prev, [right.key]: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                          </div>
                        );
                      }
                      return acc;
                    }, [])}
                    {[
                      { label: "Link LinkedIn", key: "linkLinkedIn" },
                      { label: "Địa chỉ", key: "diaChi" },
                      { label: "Thiết bị dùng làm việc", key: "thietBi" },
                    ].map(({ label, key }) => (
                      <div key={key} className="col-span-2 space-y-1">
                        <label className="text-xs font-bold text-gray-600">{label}</label>
                        <input value={step5ProfileForm[key as keyof typeof step5ProfileForm]} onChange={e => setStep5ProfileForm(prev => ({ ...prev, [key]: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex items-center justify-end gap-3">
                  <button onClick={() => setStep5View("menu")} className="text-sm font-black text-gray-500 hover:text-gray-700 transition-colors px-4 py-2">
                    Quay lại
                  </button>
                  <button onClick={() => { setProfileDone(true); setStep5View("menu"); }} className="btn-pop px-8 py-2.5 rounded-xl bg-blue-500 text-white font-black text-sm shadow hover:bg-blue-600 active:scale-95 transition-all">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Calendar Modal ──────────────────────────────────────────────────── */}
      {isCalendarModalOpen && (() => {
        const firstDayOfWeek = new Date(2026, 2, 1).getDay();
        const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const isAvailableDate = (d: number) => { const dt = new Date(2026, 2, d); return [2, 3, 5].includes(dt.getDay()) && dt >= today; };
        return (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm overlay-in" onClick={() => setIsCalendarModalOpen(false)} />
            <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl modal-pop overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">GIAO DIỆN TƯƠNG TÁC</span>
                <button onClick={() => setIsCalendarModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Calendar */}
                  <div className="flex-1 space-y-3">
                    <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider">Tháng 3, 2026</h4>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {["T2","T3","T4","T5","T6","T7","CN"].map((d) => (
                        <span key={d} className="text-[10px] font-black text-gray-300 uppercase py-1">{d}</span>
                      ))}
                      {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                        const available = isAvailableDate(date);
                        const isSelected = date === selectedDate;
                        return (
                          <button key={date} disabled={!available}
                            onClick={() => available && setSelectedDate(date)}
                            className={`aspect-square flex items-center justify-center rounded-xl text-xs font-black transition-all
                              ${isSelected ? "bg-purple-600 text-white scale-110 shadow-lg shadow-purple-400/30"
                                : available ? "text-gray-800 hover:bg-purple-50 hover:text-purple-600 cursor-pointer"
                                : "text-gray-200 cursor-not-allowed"}`}>
                            {date}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold">✓ Thứ 3, Thứ 4, Thứ 6 hàng tuần</p>
                  </div>

                  {/* Time slots */}
                  <div className="sm:w-36 space-y-3">
                    <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider">Khung giờ</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                      {["19:00","19:30","20:00","20:30"].map((t) => (
                        <button key={t} onClick={() => setSelectedTime(t)}
                          className={`py-3 px-4 border-2 rounded-xl text-sm font-black transition-all text-center
                            ${selectedTime === t
                              ? "border-purple-600 text-purple-700 bg-purple-50"
                              : "border-gray-100 text-gray-700 hover:border-purple-300 hover:bg-purple-50/40"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm button */}
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => {
                    if (!selectedDate || !selectedTime) return;
                    setIsCalendarModalOpen(false);
                    setStepModalContext(isActiveMember ? "active-calendar" : "calendar");
                    setShowStepModal(true);
                  }}
                  className={`btn-pop mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all
                    ${selectedDate && selectedTime
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                >
                  📅 Xác nhận lịch hẹn
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Fullscreen image lightbox */}
      {(isImageFullscreen || lightboxSrc) && (
        <div className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => { setIsImageFullscreen(false); setLightboxSrc(null); }}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"><X size={32} /></button>
          <img
            src={lightboxSrc ?? "https://lh3.googleusercontent.com/d/1dZvgi4ZLZoTD1-hGLeHStSO4v3J2CYzV"}
            alt="Xem ảnh"
            className="max-w-full max-h-full object-contain rounded-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Return Member Quiz Modal */}
      <ReturnMemberQuizModal
        isOpen={showReturnQuiz}
        onPass={() => { setReturnTestResult("pass"); setStepModalContext("return-pass"); setShowStepModal(true); }}
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
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }

        /* Modal pop-up animation */
        @keyframes modal-pop {
          0%   { opacity: 0; transform: scale(0.88) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.015) translateY(-2px); }
          80%  { transform: scale(0.995) translateY(1px); }
          100% { transform: scale(1) translateY(0); }
        }
        .modal-pop {
          animation: modal-pop 0.28s cubic-bezier(0.34, 1.3, 0.64, 1) forwards;
        }

        /* Overlay fade-in */
        @keyframes overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .overlay-in {
          animation: overlay-in 0.2s ease forwards;
        }

        /* Button press effect */
        .btn-pop:active { transform: scale(0.95); }
        .btn-pop { transition: transform 0.1s ease, box-shadow 0.2s ease; }
        .btn-pop:hover { transform: scale(1.02); }

        /* Chat widget */
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-slide-up { animation: chat-slide-up 0.22s cubic-bezier(0.34, 1.3, 0.64, 1) forwards; }
      `}</style>

      {/* ─── Chat Support Widget ─────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
        {/* Chat box */}
        {isChatOpen && (
          <div className="chat-slide-up w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-purple-600">
              <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="NhiLe Team" className="w-7 h-7 rounded-full object-contain bg-white/20 shrink-0" />
                <span className="text-white font-black text-sm">HR Support</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm font-medium leading-relaxed
                    ${msg.from === "user"
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-700 rounded-bl-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && chatInput.trim()) {
                    setChatMessages(prev => [...prev, { from: "user", text: chatInput.trim() }]);
                    setChatInput("");
                    setTimeout(() => {
                      setChatMessages(prev => [...prev, { from: "bot", text: "Cảm ơn bạn đã nhắn tin! Team HR sẽ phản hồi sớm nhất có thể nhé 💜" }]);
                    }, 800);
                  }
                }}
                placeholder="Nhập tin nhắn..."
                className="flex-1 text-sm px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-400 transition-colors placeholder:text-gray-400"
              />
              <button
                onClick={() => {
                  if (!chatInput.trim()) return;
                  setChatMessages(prev => [...prev, { from: "user", text: chatInput.trim() }]);
                  setChatInput("");
                  setTimeout(() => {
                    setChatMessages(prev => [...prev, { from: "bot", text: "Cảm ơn bạn đã nhắn tin! Team HR sẽ phản hồi sớm nhất có thể nhé 💜" }]);
                  }, 800);
                }}
                className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition-colors shrink-0"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* FAB button */}
        <button
          onClick={() => setIsChatOpen(prev => !prev)}
          className="w-14 h-14 rounded-full bg-purple-600 shadow-xl shadow-purple-500/30 flex items-center justify-center hover:bg-purple-700 hover:scale-110 active:scale-95 transition-all"
        >
          {isChatOpen ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
