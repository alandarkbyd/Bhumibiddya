import { CURRICULUM_DAYS, ONLINE_PRACTICE_GUIDES, FREE_RESOURCES, CurriculumDay, FreeResource } from '../data/landData';

// Map of day number to free resources
const DAY_FREE_RESOURCES: Record<number, FreeResource[]> = {
  1: [
    FREE_RESOURCES.find(r => r.id === 'e-porcha')!,
    FREE_RESOURCES.find(r => r.id === 'cs-khatiyan-online')!,
    FREE_RESOURCES.find(r => r.id === 'youtube-land-tutorial')!,
    FREE_RESOURCES.find(r => r.id === 'land-record')!,
  ].filter(Boolean),
  2: [
    FREE_RESOURCES.find(r => r.id === 'e-porcha')!,
    FREE_RESOURCES.find(r => r.id === 'land-calculator-app')!,
    FREE_RESOURCES.find(r => r.id === 'youtube-land-tutorial')!,
  ].filter(Boolean),
  3: [
    FREE_RESOURCES.find(r => r.id === 'deed-registration')!,
    FREE_RESOURCES.find(r => r.id === 'deed-fee-calculator')!,
    FREE_RESOURCES.find(r => r.id === 'youtube-land-tutorial')!,
    FREE_RESOURCES.find(r => r.id === 'registration-act-1908')!,
  ].filter(Boolean),
  4: [
    FREE_RESOURCES.find(r => r.id === 'land-calculator-app')!,
    FREE_RESOURCES.find(r => r.id === 'mouza-map')!,
    FREE_RESOURCES.find(r => r.id === 'land-record')!,
    FREE_RESOURCES.find(r => r.id === 'youtube-land-tutorial')!,
  ].filter(Boolean),
  5: [
    FREE_RESOURCES.find(r => r.id === 'e-mutation')!,
    FREE_RESOURCES.find(r => r.id === 'land-tax-payment')!,
    FREE_RESOURCES.find(r => r.id === 'youtube-land-tutorial')!,
    FREE_RESOURCES.find(r => r.id === 'gov-land-portal')!,
  ].filter(Boolean),
  6: [
    FREE_RESOURCES.find(r => r.id === 'bd-laws')!,
    FREE_RESOURCES.find(r => r.id === 'sat-act-bangla')!,
    FREE_RESOURCES.find(r => r.id === 'land-crime-act-2023')!,
    FREE_RESOURCES.find(r => r.id === 'limitation-act-1908')!,
    FREE_RESOURCES.find(r => r.id === 'specific-relief-act')!,
  ].filter(Boolean),
  7: [
    FREE_RESOURCES.find(r => r.id === 'e-porcha')!,
    FREE_RESOURCES.find(r => r.id === 'deed-registration')!,
    FREE_RESOURCES.find(r => r.id === 'facebook-land-group')!,
    FREE_RESOURCES.find(r => r.id === 'land-crime-act-2023')!,
  ].filter(Boolean),
};

export function getEnhancedCurriculumDays(): CurriculumDay[] {
  return CURRICULUM_DAYS.map(day => {
    const practiceGuide = ONLINE_PRACTICE_GUIDES[day.day];
    const freeResources = DAY_FREE_RESOURCES[day.day] || [];
    
    return {
      ...day,
      onlinePractice: practiceGuide ? {
        title: practiceGuide.title,
        steps: practiceGuide.steps
      } : undefined,
      freeResources: freeResources.length > 0 ? freeResources : undefined
    };
  });
}
