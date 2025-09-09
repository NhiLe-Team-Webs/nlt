// src/data/achievements.ts

// Import all images here
import days99_1 from '../asset/99days/1.jpg';
import days99_2 from '../asset/99days/2.jpg';
import datingNLT_1 from '../asset/Dating with NLT/1.jpeg';
import datingNLT_2 from '../asset/Dating with NLT/2.jpeg';
import datingNLT_3 from '../asset/Dating with NLT/3.jpeg';
import datingNLT_4 from '../asset/Dating with NLT/4.jpeg';
import datingNLT_5 from '../asset/Dating with NLT/5.jpeg';
import datingNLT_6 from '../asset/Dating with NLT/6.jpeg';

import thanhCo_1 from '../asset/Thành cổ Quảng Trị/1.jpg';
import thanhCo_2 from '../asset/Thành cổ Quảng Trị/2.jpg';
import thanhCo_3 from '../asset/Thành cổ Quảng Trị/3.jpg';
import thanhCo_4 from '../asset/Thành cổ Quảng Trị/4.jpg';
import thanhCo_5 from '../asset/Thành cổ Quảng Trị/5.jpg';
import viengBac_1 from '../asset/Viếng Bác Thanh/1.jpg';
import viengBac_2 from '../asset/Viếng Bác Thanh/2.jpg';
import viengBac_3 from '../asset/Viếng Bác Thanh/3.jpg';
import viengBac_4 from '../asset/Viếng Bác Thanh/4.jpg';
import viengBac_5 from '../asset/Viếng Bác Thanh/5.jpg';

import onlineMeeting_1 from '../asset/Online Meeting/1.jpg';
import onlineMeeting_2 from '../asset/Online Meeting/2.jpg';
import onlineMeeting_3 from '../asset/Online Meeting/3.jpg';
import onlineMeeting_4 from '../asset/Online Meeting/4.jpg';
import onlineMeeting_5 from '../asset/Online Meeting/5.jpg';
import onlineMeeting_6 from '../asset/Online Meeting/6.jpg';
import onlineMeeting_7 from '../asset/Online Meeting/7.jpg';
import onlineMeeting_8 from '../asset/Online Meeting/8.jpg';
import onlineMeeting_9 from '../asset/Online Meeting/9.jpg';
import onlineMeeting_10 from '../asset/Online Meeting/10.jpg';
import onlineMeeting_11 from '../asset/Online Meeting/11.jpg';
import onlineMeeting_12 from '../asset/Online Meeting/12.jpg';

import bootcamp_1 from '../asset/Bootcamp/1.png';
import bootcamp_2 from '../asset/Bootcamp/2.png';
import bootcamp_3 from '../asset/Bootcamp/3.png';
import bootcamp_4 from '../asset/Bootcamp/4.png';
import leadership_1 from '../asset/Leadership bootcamp/1.jpg';
import leadership_2 from '../asset/Leadership bootcamp/2.jpg';
import leadership_3 from '../asset/Leadership bootcamp/3.jpg';
import leadership_4 from '../asset/Leadership bootcamp/4.jpg';
import leadership_5 from '../asset/Leadership bootcamp/5.jpg';
import leadership_6 from '../asset/Leadership bootcamp/6.jpg';
import leadership_7 from '../asset/Leadership bootcamp/7.jpg';
import nBonding_1 from '../asset/N Bonding/1.jpeg';
import nBonding_2 from '../asset/N Bonding/2.jpeg';
import nBonding_3 from '../asset/N Bonding/3.png';
import nBonding_4 from '../asset/N Bonding/4.png';
import nBonding_5 from '../asset/N Bonding/5.png';
import nBonding_6 from '../asset/N Bonding/6.png';
import nBonding_7 from '../asset/N Bonding/7.png';
import nBonding_8 from '../asset/N Bonding/8.jpeg';
import nBonding_9 from '../asset/N Bonding/9.jpeg';
import nBonding_10 from '../asset/N Bonding/10.jpeg';
import nBonding_11 from '../asset/N Bonding/11.jpeg';
import nBonding_12 from '../asset/N Bonding/12.jpg';
import nBonding_13 from '../asset/N Bonding/13.jpeg';


export const achievementCategories = [
  {
    categoryTitle: "Những hoạt động cộng đồng",
    categoryDescription: "Đây là phần ghi lại các sự kiện cộng đồng mà NhiLe Team đã tổ chức. Nó bao gồm các hoạt động kết nối, chia sẻ kiến thức, và tạo sân chơi cho các thành viên, giúp xây dựng một cộng đồng vững mạnh và gắn kết.",
    slug: "community-events",
    projects: [
      {
        projectTitle: "Dự án: 99 days",
        projectDescription: "Tập thể dục và phát triển bản thân cùng cộng đồng NhiLe Team...",
        slug: "99-days",
        album: [
          { src: days99_1, alt: "Ngày 1 của thử thách" },
          { src: days99_2, alt: "Hoàn thành thử thách" },
        ],
      },
      {
        projectTitle: "Dự án: Dating with NhiLe Team",
        projectDescription: "Chuỗi sự kiện kết nối các thành viên trong cộng đồng NhiLe Team...",
        slug: "dating-with-nlt",
        album: [
          { src: datingNLT_1, alt: "Dating with NLT" }, { src: datingNLT_2, alt: "Dating with NLT" },
          { src: datingNLT_3, alt: "Dating with NLT" }, { src: datingNLT_4, alt: "Dating with NLT" },
          { src: datingNLT_5, alt: "Dating with NLT" }, { src: datingNLT_6, alt: "Dating with NLT" },
        ],
      },
    ],
  },
  {
    categoryTitle: "Tham quan các di tích, địa điểm lịch sử",
    categoryDescription: "Đây là phần dành cho các dự án thiện nguyện hoặc hoạt động xã hội của team, tập trung vào việc bảo tồn hoặc quảng bá các di tích và địa điểm lịch sử...",
    slug: "historical-places",
    projects: [
      {
        projectTitle: "Dự án: Thành cổ Quảng Trị",
        projectDescription: "Một chuyến đi ý nghĩa đến Thành cổ Quảng Trị để khám phá lịch sử hào hùng và tưởng nhớ các anh hùng dân tộc.",
        slug: "thanh-co-quang-tri",
        album: [
          { src: thanhCo_1, alt: "Thành cổ Quảng Trị" }, { src: thanhCo_2, alt: "Thành cổ Quảng Trị" },
          { src: thanhCo_3, alt: "Thành cổ Quảng Trị" }, { src: thanhCo_4, alt: "Thành cổ Quảng Trị" },
          { src: thanhCo_5, alt: "Thành cổ Quảng Trị" },
        ],
      },
      {
        projectTitle: "Dự án: Viếng Bác Thanh",
        projectDescription: "Chuyến thăm đầy xúc động đến quê hương Bác Hồ, thể hiện lòng biết ơn và sự kính trọng đối với vị cha già của dân tộc.",
        slug: "vieng-bac-thanh",
        album: [
          { src: viengBac_1, alt: "Viếng Bác Thanh" }, { src: viengBac_2, alt: "Viếng Bác Thanh" },
          { src: viengBac_3, alt: "Viếng Bác Thanh" }, { src: viengBac_4, alt: "Viếng Bác Thanh" },
          { src: viengBac_5, alt: "Viếng Bác Thanh" },
        ],
      },
    ],
  },
  {
    categoryTitle: "Online meeting",
    categoryDescription: "Đây là nơi lưu trữ các tài liệu, biên bản và ghi chép của các cuộc họp trực tuyến...",
    slug: "online-meetings",
    projects: [
      {
        projectTitle: "Album: Gặp mặt trực tuyến",
        projectDescription: "Tổng hợp các khoảnh khắc trong các buổi họp, workshop và buổi chia sẻ trực tuyến của NhiLe Team.",
        slug: "online-meeting",
        album: [
          { src: onlineMeeting_1, alt: "Online Meeting" }, { src: onlineMeeting_2, alt: "Online Meeting" },
          { src: onlineMeeting_3, alt: "Online Meeting" }, { src: onlineMeeting_4, alt: "Online Meeting" },
          { src: onlineMeeting_5, alt: "Online Meeting" }, { src: onlineMeeting_6, alt: "Online Meeting" },
          { src: onlineMeeting_7, alt: "Online Meeting" }, { src: onlineMeeting_8, alt: "Online Meeting" },
          { src: onlineMeeting_9, alt: "Online Meeting" }, { src: onlineMeeting_10, alt: "Online Meeting" },
          { src: onlineMeeting_11, alt: "Online Meeting" }, { src: onlineMeeting_12, alt: "Online Meeting" },
        ],
      },
    ],
  },
  {
    categoryTitle: "Team building",
    categoryDescription: "Đây là phần tổng hợp các hoạt động xây dựng đội ngũ. Nó cho thấy NhiLe Team không chỉ tập trung vào công việc mà còn chú trọng tạo ra một môi trường làm việc tích cực...",
    slug: "team-building",
    projects: [
      {
        projectTitle: "Album: Bootcamp",
        projectDescription: "Các buổi rèn luyện kỹ năng và tinh thần đồng đội tại các buổi bootcamp sôi động và đầy thử thách.",
        slug: "bootcamp",
        album: [
          { src: bootcamp_1, alt: "Bootcamp" }, { src: bootcamp_2, alt: "Bootcamp" },
          { src: bootcamp_3, alt: "Bootcamp" }, { src: bootcamp_4, alt: "Bootcamp" },
        ],
      },
      {
        projectTitle: "Album: Leadership bootcamp",
        projectDescription: "Tổng hợp hình ảnh từ trại huấn luyện lãnh đạo, nơi các thành viên được mài giũa tư duy và kỹ năng để trở thành những người dẫn dắt trong tương lai.",
        slug: "leadership-bootcamp",
        album: [
          { src: leadership_1, alt: "Leadership bootcamp" }, { src: leadership_2, alt: "Leadership bootcamp" },
          { src: leadership_3, alt: "Leadership bootcamp" }, { src: leadership_4, alt: "Leadership bootcamp" },
          { src: leadership_5, alt: "Leadership bootcamp" }, { src: leadership_6, alt: "Leadership bootcamp" },
          { src: leadership_7, alt: "Leadership bootcamp" },
        ],
      },
      {
        projectTitle: "Album: N Bonding",
        projectDescription: "Các hoạt động gắn kết nội bộ, giúp các thành viên giao lưu, chia sẻ và tăng cường sự hiểu biết lẫn nhau trong một không khí vui vẻ và thân thiện.",
        slug: "n-bonding",
        album: [
          { src: nBonding_1, alt: "N Bonding" }, { src: nBonding_2, alt: "N Bonding" },
          { src: nBonding_3, alt: "N Bonding" }, { src: nBonding_4, alt: "N Bonding" },
          { src: nBonding_5, alt: "N Bonding" }, { src: nBonding_6, alt: "N Bonding" },
          { src: nBonding_7, alt: "N Bonding" }, { src: nBonding_8, alt: "N Bonding" },
          { src: nBonding_9, alt: "N Bonding" }, { src: nBonding_10, alt: "N Bonding" },
          { src: nBonding_11, alt: "N Bonding" }, { src: nBonding_12, alt: "N Bonding" },
          { src: nBonding_13, alt: "N Bonding" },
        ],
      },
    ],
  },
];