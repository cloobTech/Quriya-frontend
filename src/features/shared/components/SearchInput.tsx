import React from 'react';
import { TextInput } from '@mantine/core';
import { BsSearch } from 'react-icons/bs';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  disabled = false,
}) => {
  return (
    <TextInput
      radius="xl"
      leftSection={<BsSearch />}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      disabled={disabled}
      className={className}
      styles={{
        input: {
          backgroundColor: '#f0f0f0',
          border: 'none',
          '::placeholder': {
            color: '#909296',
          },
        },
      }}
    />
  );
};