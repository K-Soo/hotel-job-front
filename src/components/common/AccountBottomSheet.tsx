import styled from 'styled-components';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useRecoilState } from 'recoil';
import { bottomSheetAtom } from '@/recoil/bottomSheet';
import { GENERAL_ASIDE_MENU } from '@/constants/menu';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/icons/Icon';

import 'react-spring-bottom-sheet/dist/style.css';

interface AccountBottomSheetProps {}

export default function AccountBottomSheet({}: AccountBottomSheetProps) {
  const [bottomSheetAtomState, setBottomSheetAtomState] = useRecoilState(bottomSheetAtom);

  const onDismiss = () => setBottomSheetAtomState((prev) => ({ ...prev, isOpen: false }));

  return (
    <StyledBottomSheet
      blocking={true} //백그라운드 요소를 상호작용 여부
      scrollLocking={true}
      expandOnContentDrag={false} //BottomSheet의 콘텐츠를 드래그하여 시트 크기를 확장할 수 있는지 제어 여부
      onDismiss={onDismiss}
      open={bottomSheetAtomState.isOpen}
      snapPoints={(props) => {
        return props.maxHeight * 0.8;
      }}
    >
      {GENERAL_ASIDE_MENU.map((element) => {
        return (
          <div key={element.label}>
            <motion.div
              className="menu-item"
              whileTap={{ scale: 0.98 }}
              // onClick={() => setIsOpen((prev) => (prev === element.value ? null : element.value))}
            >
              <h6>{element.label}</h6>
              {element.items.length !== 0 && <Icon name="ArrowRight16x16" width="16px" height="16px" />}
            </motion.div>

            <AnimatePresence>
              {/* {true && (
                <motion.div
                  animate={{ height: 'auto', opacity: 1 }}
                  initial={{ height: 0, opacity: 0 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {element.items.map((item) => (
                    <motion.div
                      key={item.value}
                      onClick={() => {}}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.05, ease: 'easeIn' }}
                    >
                      <div className="content">{item.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )} */}
            </AnimatePresence>
          </div>
        );
      })}
    </StyledBottomSheet>
  );
}

const StyledBottomSheet = styled(BottomSheet)`
  [data-rsbs-overlay] {
    z-index: 10;
  }
`;
