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
		date: '2025-07-21',
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
		date: '2026-06-03',
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
		date: '2026-06-04',
		image: '/images/krok-e-dok/cover.webp',
		tags: ['hiking', 'saraburi'],
		location: 'แก่งคอย สระบุรี',
		difficulty: 'ชันและลื่น',
		name: 'น้ำตกโกรกอีดก',
		nameEn: 'Krok E-Dok Waterfall',
		coords: [14.4531, 101.2152]
	}
];

export const trailPoints = trailPosts.map((post) => ({
	id: post.id,
	name: post.name,
	nameEn: post.nameEn,
	coords: post.coords,
	blogUrl: `/blog/${post.slug}/`
}));
