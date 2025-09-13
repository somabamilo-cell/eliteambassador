
import Image from 'next/image';
import Partners from '../assets/partners-logo.png'

const Paragraph = () => {
  return (
    <section>
      <h2 className="md:text-center text-2xl md:text-3xl">ONLINE AMBASSADORS PROGRAM</h2>
      <p className="my-6 md:text-center md:text-lg max-w-5xl mx-auto">
        Online ambassadors program (OPD) is back! After successfully positioned
        previous winners in the fashion,music, dance and comedy local shows as
        AMBASSADORS! We are back to engage your talents!. so if you are above 18
        & above and have passion for music,comedy,dancing and fashion, here is a
        chance to shine. The price is going to be awarded at the end of the show
        pending on vote from the contestant.
      </p>
      <Image sizes='100%x' src={Partners} alt="Partner-Logo" />
    </section>
  );
};

export default Paragraph;
