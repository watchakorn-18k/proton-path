export type TrailPost = {
	id: number;
	slug: string;
	title: string;
	description: string;
	date: string;
	image: string;
	tags: string[];
	location: string;
	difficulty: string;
	name: string;
	nameEn: string;
	coords: [number, number];
};

export const trailPosts: TrailPost[] = [
	{
		id: 1,
		slug: 'pretoloso-hiking',
		title: 'เที่ยวเดินป่า | เปรโต๊ะลอซู จังหวัดตาก',
		description: 'บันทึกการเดินป่าครั้งแรกในชีวิตที่มีการนอนในป่ากับธรรมชาติ 2 คืน 3 วัน',
		date: '2025-06-07',
		image: '/images/hiking-blog/20250607_122045.webp',
		tags: ['hiking', 'travel'],
		location: 'อุ้มผาง ตาก',
		difficulty: 'ยากมาก',
		name: 'น้ำตกเปรโต๊ะลอซู',
		nameEn: 'Pretoloso Waterfall',
		coords: [15.8649006, 98.6161577]
	},
	{
		id: 2,
		slug: 'khao-luang-sukhothai',
		title: 'เที่ยวเดินป่า | เขาหลวงสุโขทัย อุทยานแห่งชาติรามคำแหง',
		description: 'บันทึกการเดินป่าเขาหลวงสุโขทัย เส้นทางสั้นแต่ชันมากถึง 70-80% ท้าทายขาและเข่าตลอดเส้นทาง 3.7 กิโลเมตร',
		date: '2025-07-09',
		image: '/images/khao-luang/cover.webp',
		tags: ['hiking', 'sukhothai'],
		location: 'สุโขทัย',
		difficulty: 'ชันมาก',
		name: 'เขาหลวงสุโขทัย',
		nameEn: 'Khao Luang Sukhothai',
		coords: [16.863378612088965, 99.67502060100429]
	},
	{
		id: 3,
		slug: 'krok-e-dok',
		title: 'เที่ยวเดินป่า | น้ำตกโกรกอีดก จังหวัดสระบุรี',
		description: 'บันทึกการเดินทางลุยน้ำตกโกรกอีดก เส้นทางเดินป่าหน้าฝนที่เต็มไปด้วยความลื่น ชัน และน้ำตกสวยงาม 7 ชั้น',
		date: '2025-07-21',
		image: '/images/krok-e-dok/cover.webp',
		tags: ['hiking', 'saraburi'],
		location: 'แก่งคอย สระบุรี',
		difficulty: 'ชันและลื่น',
		name: 'น้ำตกโกรกอีดก',
		nameEn: 'Krok E-Dok Waterfall',
		coords: [14.4531, 101.2152]
	},
	{
		id: 4,
		slug: 'man-daeng-waterfall',
		title: 'เที่ยวเดินป่า | น้ำตกหมันแดง อุทยานแห่งชาติภูหินร่องกล้า',
		description: 'บันทึกการเดินป่าน้ำตกหมันแดง เส้นทางหน้าฝนที่เละเป็นโคลน ดงทากชุม ต้องใส่ถุงกันทาก น้ำตกสวยทุกชั้นแต่หินลื่นสุดๆ ปิดท้ายด้วยการนั่งรถชมวิถีชีวิตชาวชาติพันธุ์ขากลับ',
		date: '2025-08-21',
		image: '/images/man-daeng/cover.webp',
		tags: ['hiking', 'phitsanulok'],
		location: 'ภูหินร่องกล้า พิษณุโลก',
		difficulty: 'ลื่นและทากชุม',
		name: 'น้ำตกหมันแดง',
		nameEn: 'Man Daeng Waterfall',
		coords: [16.942118833250092, 101.06469846699815]
	},
	{
		id: 5,
		slug: 'phu-soi-dao',
		title: 'เที่ยวเดินป่า | อุทยานแห่งชาติภูสอยดาว ลานสนหน้าฝน',
		description: 'บันทึกการเดินป่าขึ้นลานสนภูสอยดาว เส้นทางชันสลับสบาย เหนื่อยแต่ไม่หนักเท่าเขาหลวงสุโขทัย กับทะเลหมอกหน้าฝนที่สวยจนลืมความเหนื่อย',
		date: '2025-09-16',
		image: '/images/phu-soi-dao/cover.webp',
		tags: ['hiking', 'uttaradit'],
		location: 'น้ำปาด อุตรดิตถ์ / ชาติตระการ พิษณุโลก',
		difficulty: 'ปานกลาง',
		name: 'อุทยานแห่งชาติภูสอยดาว',
		nameEn: 'Phu Soi Dao National Park',
		coords: [17.738090084648288, 100.98906317281674]
	},
	{
		id: 7,
		slug: 'erawan-waterfall',
		title: 'เที่ยวเดินป่า | อุทยานแห่งชาติน้ำตกเอรวัณ จังหวัดกาญจนบุรี',
		description: 'จุดแวะพักระหว่างทางก่อนขึ้นสันหนอกวัว เส้นทางเดินง่ายแต่ร้อน เหมาะกับคนไปเล่นน้ำและถ่ายรูป',
		date: '2026-05-20',
		image: '/images/erawan/cover.webp',
		tags: ['hiking', 'kanchanaburi', 'waterfall'],
		location: 'กาญจนบุรี',
		difficulty: 'ง่าย ร้อน',
		name: 'อุทยานแห่งชาติน้ำตกเอรวัณ',
		nameEn: 'Erawan National Park',
		coords: [14.358938641390635, 99.14044130743585]
	},
	{
		id: 8,
		slug: 'mae-wong-chong-yen',
		title: 'เที่ยวเดินป่า | อุทยานแห่งชาติแม่วงก์ ช่องเย็น',
		description: 'บันทึกการเดินป่าอุทยานแห่งชาติแม่วงก์ จุดช่องเย็น เส้นทางธรรมชาติท่ามกลางป่าดิบแล้งและลำธารสวยงาม',
		date: '2025-12-21',
		image: '/images/mae-wong-chong-yen/cover.webp',
		tags: ['hiking', 'nakhon-sawan'],
		location: 'นครสวรรค์ / กำแพงเพชร',
		difficulty: 'ปานกลาง',
		name: 'อุทยานแห่งชาติแม่วงก์ ช่องเย็น',
		nameEn: 'Mae Wong National Park - Chong Yen',
		coords: [15.6167, 99.5167]
	},
	{
		id: 10,
		slug: 'lam-khlong-ngu',
		title: 'เที่ยวเดินป่า | อุทยานแห่งชาติลำคลองงู ถ้ำนกนางแอ่น',
		description: 'บันทึกการผจญภัยถ้ำนกนางแอ่น เดินป่าปีนขึ้นถ้ำช่วงแรกร้อนและเหนื่อย ผ่านถ้ำประตูทะลุมิติ แล้วลงเล่นน้ำและโดดผาสุดมันส์ จองยากแต่คุ้มค่า',
		date: '2026-03-16',
		image: '/images/lam-khlong-ngu/cover.webp',
		tags: ['hiking', 'kanchanaburi', 'cave'],
		location: 'กาญจนบุรี',
		difficulty: 'ปานกลาง ร้อน',
		name: 'ถ้ำนกนางแอ่น ลำคลองงู',
		nameEn: 'Lam Khlong Ngu National Park',
		coords: [14.819479629118574, 98.83823968427374]
	}
];

export const trailPoints = trailPosts.map((post) => ({
	id: post.id,
	name: post.name,
	nameEn: post.nameEn,
	coords: post.coords,
	date: post.date,
	blogUrl: `/blog/${post.slug}/`
}));
