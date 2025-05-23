import { theme } from '@/styles/theme';
import { Feather } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Step } from '../../@types';

type StepsProps = {
  steps: Step[];
  selectedStepId: string;
};

export const Steps = ({ steps, selectedStepId }: StepsProps) => {
  return (
    <View style={styles.container}>
      {steps.map(({ id, icon, isCompleted }, index) => {
        const isCompletedAndNextIsCompleted = isCompleted && steps[index + 1]?.isCompleted;
        const isCompletedAndNextIsSelected = isCompleted && steps[index + 1]?.id === selectedStepId;
        const isSelectedAndNextIsDefault = id === selectedStepId && !steps[index + 1]?.isCompleted;
        const isDefaultAndNextIsDefault = !isCompleted && !isSelectedAndNextIsDefault;

        return (
          <Fragment key={id}>
            <View
              style={[styles.step, isCompleted && styles.completedStep, selectedStepId === id && styles.selectedStep]}
            >
              <Feather
                name={isCompleted ? 'check' : (icon as any)}
                color={
                  isCompleted
                    ? theme.colors.functional.success.main
                    : selectedStepId === id
                      ? theme.colors.neutral[100]
                      : theme.colors.neutral[400]
                }
                size={20}
              />
            </View>
            {index !== steps.length - 1 && (
              <LinearGradient
                colors={
                  isCompletedAndNextIsCompleted
                    ? [theme.colors.functional.success.bg, theme.colors.functional.success.bg]
                    : isCompletedAndNextIsSelected
                      ? [theme.colors.functional.success.bg, theme.colors.primary[300]]
                      : isSelectedAndNextIsDefault
                        ? [theme.colors.primary[300], theme.colors.neutral[500]]
                        : isDefaultAndNextIsDefault
                          ? [theme.colors.neutral[500], theme.colors.neutral[500]]
                          : [theme.colors.primary[300], theme.colors.primary[300]]
                }
                start={[0, 1]}
                end={[1, 0]}
                style={styles.connector}
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: theme.colors.neutral[500]
  },
  completedStep: {
    backgroundColor: theme.colors.functional.success.bg,
    borderWidth: 1,
    borderColor: theme.colors.functional.success.main
  },
  selectedStep: {
    backgroundColor: theme.colors.primary[300]
  },
  connector: {
    flex: 1,
    height: 1
  }
});
