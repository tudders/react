import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useEffect } from 'react';

const Home = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0 });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: false, amount: 0 });
  const controls = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);

  useEffect(() => {
    if (isInView2) {
      controls2.start('visible');
    } else {
      controls2.start('hidden');
    }
  }, [controls2, isInView2]);

  return (
    <div>
      <div className="mx-auto h-100vh">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="modal"
              className="fixed"
              animate={controls}
              initial="hidden"
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0 },
              }}
              exit={{ opacity: 0 }}
            >
              <h1
                className="text-9xl pt-32 p-2 font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text tracking-tight"
              >
                Simplis
              </h1>
              <h3 className="mt-8 text-2xl p-3 ">A React demo</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <div className="h-100vh" ref={ref}></div>
      </div>
    </div>
  );
};

export default Home;
