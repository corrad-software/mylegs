
import { Topic, Statute, CaseLawProvider, ExternalLink, CaseSummary, ExamResource } from './types';

// Mock URLs - in a real app these would be actual Google Drive / External links
const MOCK_PDF_URL = "https://drive.google.com/file/d/1uEtJtsvjKDHA7Wg4g3JtoswEhnYGnC7H/view"; // Placeholder PDF
const MOCK_WEB_URL = "https://wayground.com/join?gc=04829140";

export const STATUTES: Statute[] = [
  { 
    id: 's1', 
    title: 'Federal Constitution', 
    url: 'https://drive.google.com/file/d/1shSafXNWjtxSdtiRen9d_49KEKIltmNr/preview' 
  },
  { 
    id: 's2', 
    title: 'Civil Law Act 1956', 
    url: 'https://drive.google.com/file/d/17xNrHbdMzX8TRWQ9YfDVXDYgc19auvc1/preview' 
  },
  { 
    id: 's3', 
    title: 'Courts Of Judicature Act 1964', 
    url: 'https://drive.google.com/file/d/1aM4tL2GbF_6cj53rUHz5AtrB6CujD3pO/preview' 
  },
  { 
    id: 's4', 
    title: 'Subordinate Courts Act 1948', 
    url: 'https://drive.google.com/file/d/1YL2_alFEiU2Dx6qaW3BY_209E9uh1P2p/preview' 
  },
  { 
    id: 's5', 
    title: 'Administration Of Islamic Law (Federal Territories) Act 1993', 
    url: 'https://drive.google.com/file/d/1siNEuPltbh-2Rs_cQMglpsL6mQb_0Yg-/preview' 
  },
];

export const PAST_EXAMS: ExamResource[] = [
  {
    id: 'pe1',
    title: 'Malaysian Legal System - Final Examination',
    category: 'Past Year',
    year: '2023/2024',
    semester: 'Sem 1',
    url: MOCK_PDF_URL
  },
  {
    id: 'pe2',
    title: 'Malaysian Legal System - Final Examination',
    category: 'Past Year',
    year: '2022/2023',
    semester: 'Sem 2',
    url: MOCK_PDF_URL
  },
  {
    id: 'pe3',
    title: 'Malaysian Legal System - Final Examination',
    category: 'Past Year',
    year: '2022/2023',
    semester: 'Sem 1',
    url: MOCK_PDF_URL
  },
  {
    id: 'pe4',
    title: 'Malaysian Legal System - Mid-Semester Test',
    category: 'Past Year',
    year: '2023',
    semester: 'Sem 1',
    url: MOCK_PDF_URL
  }
];

export const QUESTION_BANKS: ExamResource[] = [
  {
    id: 'qb1',
    title: 'Topic 1: Overview - Essay Questions',
    category: 'Model Question',
    url: MOCK_PDF_URL,
    topicId: 't1'
  },
  {
    id: 'qb2',
    title: 'Topic 3: Sources of Law - Problem Questions',
    category: 'Model Question',
    url: MOCK_PDF_URL,
    topicId: 't3'
  },
  {
    id: 'qb3',
    title: 'Topic 5: Judiciary - Structured Questions',
    category: 'Model Question',
    url: MOCK_PDF_URL,
    topicId: 't5'
  },
  {
    id: 'ans1',
    title: 'Model Answers: Constitutional Supremacy',
    category: 'Answer Key',
    url: MOCK_PDF_URL,
    topicId: 't3'
  }
];

export const CASE_SUMMARIES: CaseSummary[] = [
  {
    id: 'c1',
    title: 'Ah Thian v Government of Malaysia [1976]',
    content: `The Federal Court in this case emphasized the supremacy of the Federal Constitution. Tun Suffian LP held that the doctrine of Parliamentary Supremacy does not apply in Malaysia as it does in the United Kingdom. Instead, Malaysia subscribes to the doctrine of Constitutional Supremacy.

This means that the power of Parliament and State Legislatures is limited by the Constitution, and they cannot make any law they please. Any law passed that is inconsistent with the Constitution shall be void to the extent of the inconsistency, as stated in Article 4(1).`
  },
  {
    id: 'c2',
    title: 'Loh Kooi Choon v Government of Malaysia [1977]',
    content: `This case addressed the extent of Parliament's power to amend the Constitution. The plaintiff argued that an amendment to Article 5(4) concerning fundamental liberties was unconstitutional. The Federal Court held that Parliament has the power to amend the Constitution provided the proper procedure in Article 159 is followed.

Raja Azlan Shah FJ stated that the Constitution is not a rigid document but a living one, capable of growth. However, this power to amend is not absolute and must adhere to the specific requirements set out within the Constitution itself.`
  },
  {
    id: 'c3',
    title: 'Phang Chin Hock v Public Prosecutor [1980]',
    content: `The appellant challenged the validity of the Emergency (Essential Powers) Act 1979. The Federal Court had to decide whether the basic structure of the Constitution could be amended by Parliament.

The Court held that Parliament has the power to amend the Constitution, including the basic structure, as long as it does not destroy the basic structure. The court emphasized that the power of Parliament to amend the Constitution is a distinct power from its ordinary legislative power.`
  },
  {
    id: 'c4',
    title: 'Donoghue v Stevenson [1932]',
    content: `This seminal House of Lords case established the modern law of negligence and the 'neighbour principle'. The plaintiff fell ill after drinking ginger beer which contained a decomposed snail. She had no contract with the manufacturer as her friend had purchased the drink.

Lord Atkin ruled that a manufacturer owes a duty of care to the ultimate consumer of the product. He formulated the neighbour principle: "You must take reasonable care to avoid acts or omissions which you can reasonably foresee would be likely to injure your neighbour."`
  },
  {
    id: 'c5',
    title: 'Carlill v Carbolic Smoke Ball Co [1893]',
    content: `A medical firm advertised that their new drug, a carbolic smoke ball, would cure the flu, and if it did not, buyers would receive £100. When Mrs. Carlill used it and still got the flu, the company refused to pay, claiming the ad was 'mere puff'.

The Court of Appeal held that the advertisement constituted a binding unilateral offer that could be accepted by anyone who performed its conditions. The deposit of £1,000 in the bank showed the company's sincerity, distinguishing it from a mere sales puff.`
  }
];

export const CASE_LAW_PROVIDERS: CaseLawProvider[] = [
  { 
    id: 'clj', 
    name: 'CLJ Law', 
    url: 'https://exec.cljprime.com/signon.aspx?ReturnUrl=%2fMembers%2fWelcome.aspx%3fFrom%3dSearchDir&From=SearchDir', 
    logo: 'https://logo.clearbit.com/cljlaw.com' 
  },
  { 
    id: 'lexis', 
    name: 'Lexis Nexis Malaysia', 
    url: 'https://advance.lexis.com/myresearchhome/?pdmfid=1522468&identityprofileid=4B822D58284&crid=8feda149-0ea1-43f4-ad54-3ba3fe652308', 
    logo: 'https://logo.clearbit.com/lexisnexis.com' 
  },
  { 
    id: 'westlaw', 
    name: 'Westlaw (Asia)', 
    url: MOCK_WEB_URL, 
    logo: 'https://logo.clearbit.com/thomsonreuters.com' 
  },
  { 
    id: 'lawnet', 
    name: 'Lawnet', 
    url: 'https://www.lawnet.com.my/account/login', 
    logo: 'https://logo.clearbit.com/lawnet.com.my' 
  },
  { 
    id: 'bar', 
    name: 'Malaysian Bar', 
    url: MOCK_WEB_URL, 
    logo: 'https://logo.clearbit.com/malaysianbar.org.my' 
  },
  { 
    id: 'kehakiman', 
    name: 'Badan Kehakiman', 
    url: MOCK_WEB_URL, 
    logo: 'https://logo.clearbit.com/kehakiman.gov.my' 
  },
];

export const TOPICS: Topic[] = [
  { 
    id: 't1', 
    number: 1, 
    title: 'Overview of the Legal System', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: ['s1'],
    relatedCaseSummaryIds: ['c1', 'c2']
  },
  { 
    id: 't2', 
    number: 2, 
    title: 'Intro to Law & Legal Method', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: ['s2'],
    relatedCaseSummaryIds: ['c3', 'c4']
  },
  { 
    id: 't3', 
    number: 3, 
    title: 'Sources of Malaysian Law', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: ['s1', 's2'],
    relatedCaseSummaryIds: ['c1', 'c3', 'c5']
  },
  { 
    id: 't4', 
    number: 4, 
    title: 'The Doctrine of Separation of Powers', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: ['s1'],
    relatedCaseSummaryIds: ['c2']
  },
  { 
    id: 't5', 
    number: 5, 
    title: 'The Judicial System', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: ['s3', 's4'],
    relatedCaseSummaryIds: ['c1']
  },
  { 
    id: 't6', 
    number: 6, 
    title: 'Syariah Legal System', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: ['s5'],
    relatedCaseSummaryIds: []
  },
  { 
    id: 't7', 
    number: 7, 
    title: 'Legal Profession in Malaysia', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: [],
    relatedCaseSummaryIds: []
  },
  { 
    id: 't8', 
    number: 8, 
    title: 'Alternative Dispute Resolution', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: [],
    relatedCaseSummaryIds: []
  },
  { 
    id: 't9', 
    number: 9, 
    title: 'Law Making Process', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: ['s1'],
    relatedCaseSummaryIds: ['c3']
  },
  { 
    id: 't10', 
    number: 10, 
    title: 'Current Issues in Law', 
    notesUrl: MOCK_PDF_URL, 
    quizUrl: MOCK_WEB_URL, 
    gameUrl: MOCK_WEB_URL,
    relatedStatuteIds: [],
    relatedCaseSummaryIds: []
  },
];

export const MORE_LINKS: ExternalLink[] = [
  { id: 'm1', category: 'UniSZA', title: 'UniSZA e-Learning Platform', url: 'https://kelipfuha.unisza.edu.my/login/index.php' },
  { id: 'm2', category: 'Judiciary', title: 'Judiciary Virtual Tour', url: MOCK_WEB_URL },
  { id: 'm3', category: 'Research', title: 'Google Scholar', url: 'https://scholar.google.com' },
];
