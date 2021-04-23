import React from 'react';
import { Text } from 'react-native';
import InfoRow from '../components/InfoRow';

const labelMap = {
  birthDate: 'Birthday',
  ageGroup: 'Age Group',
  coatLength: 'Coat Length',
  sizeGroup: 'Size Group',
  activityLevel: 'Activity Level',
};
const forms = {
  basicInfo: {
    birthDate: 'Birthday',
    ageGroup: 'Age Group',
    sex: 'Sex',
  },
  appearance: {
    breedString: 'Breed',
    isBreedMixed: 'Mixed breed',
    sizeGroup: 'Size Group',
    coatLength: 'Coat Length',
    colorDetails: 'Color',
  },
  behavior: {
    isCurrentVaccination: 'Vaccinations',
    isDeclawed: 'Is Declawed',
    groomingNeeds: 'Grooming',
    energyLevel: 'Energy Level',
    exerciseNeeds: 'Exercise Needs',
    indoorOutdoor: 'Indoor/Outdoor',
    isHousetrained: 'Housetrained',
    obedienceTraining: 'Training',
    vocalLevel: 'Vocal level',
    newPeopleReaction: 'New People Raction',
    isSpecialNeeds: 'Has Special Needs',
    specialNeedsDetails: 'Special Needs Details',
    isMicrochipped: 'Microchipped',
  },
};

export function formatDate(dateString) {
  return dateString && new Date(dateString).toLocaleDateString();
}

export function formatBool(value) {
  return value ? 'Yes' : 'No';
}

export function getInfoRowsFromData(data, form = 'basicInfo') {
  if (data) {
    const fields = forms[form];
    // Filter data to only fields in provided form, and no undefined values
    const arr = Object.entries(data).filter(
      ([key, value]) => fields[key] !== undefined && value !== undefined,
    );
    // Map fields and values to labels
    if (arr.length > 0) {
      return arr.map(([key, value]) => (
        <InfoRow
          key={key}
          label={fields[key]}
          value={typeof value === 'boolean' ? formatBool(value) : value}
        />
      ));
    } else {
      return <Text>No information.</Text>;
    }
  }
  return [];
}
