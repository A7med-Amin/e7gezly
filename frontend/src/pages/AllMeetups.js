import Layout from '../Components/layout/Layout';
import MeetupList from '../Components/meetups/MeetupList'

const ABOUT_DATA = [
  {
    id: 'm1',
    title: 'Egyptian league history',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/35/Al_Ahly_1948.png',
    address: '',
    description:
      `The Egyptian Premier League, founded in 1948, stands as one of Africa's oldest and most prestigious football competitions.
      Throughout its rich history, the league has been a breeding ground for talent and a stage for intense rivalries.`,
    des:
      `Clubs like Al Ahly and Zamalek have consistently dominated Egyptian football, amassing numerous titles and fostering a fierce competition known as the Cairo Derby.
      Over the years, the league has witnessed the emergence of legendary players who have left an indelible mark on both domestic and international football. Egypt's 
      footballing history is intertwined with the successes and challenges of its league, reflecting the passion and dedication of its players, coaches, and fans. As the league continues to evolve, 
      it remains a vital part of the country's sporting identity and contributes significantly to the development of football in the African continent.
      The league has undergone various format changes and expansions over the years, adapting to the evolving landscape of football. It serves as a crucial platform for nurturing young talent, and 
      many Egyptian players who have achieved success both domestically and internationally have honed their skills in the league. Notable figures like Mohamed Salah, Ahmed Hossam "Mido," and 
      Mohamed Aboutrika have risen to prominence through their performances in the Egyptian Premier League. The league has faced its share of challenges, including occasional disruptions 
      due to political and social unrest. Nevertheless, it has remained resilient, contributing significantly to the development of football in Egypt and maintaining its status 
      as one of Africa's premier domestic competitions. As the league continues to evolve, it remains a focal point of national pride and a crucial component in the growth of football across the African continent.`
  },
  {
    id: 'm2',
    title: 'Post-war Period',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/5/53/Zamalek_football_team_in_caf_champions_league_1993.jpg',
    address: '',
    description:
      `The league returned to its 24-team format for the 1975-76 championship, but it quickly reverted to a format featuring between 12 and 16 teams. After the Yom Kippur War, Al Ahly won three championships straight,
      followed by a single championship for Zamalek.`,
    des:
      `This pattern would continue until 1990: Al Ahly would win many championships, followed by a single win for Zamalek. This was only interrupted 
      by Al Mokawloon winning the 1982-83 edition. This is the latest time a team has won the League for the first time. Al Ahly and Zamalek also dominated the CAF Champions League, starting with a 1982 triumph for Al Ahly. 
      The Egyptian Priemer League became the most successful league in that tournament when Zamalek won in 1993.
      The league was not played in 1990 because of Egypt's qualification for the 1990 World Cup. After this delay, Ismaily won the 1990-91 season, followed by Zamalek winning twice in a row, and after that Al Ahly won every 
      season until the turn of the century. Zamalek and Ismaily briefly rose in power once again between 2000 and 2004, and Ismaily's 2001-02 win is the latest time that a team other than Zamalek and Al Ahly have won.`
  },
];

function AllMeetupsPage() {
  return (
    <Layout>
      <section>
        <h1>About EPL</h1>
        <MeetupList meetups={ABOUT_DATA} />
      </section>
    </Layout>
  );
}

export default AllMeetupsPage;