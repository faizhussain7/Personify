import { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  BackHandler,
  TextInput,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Person } from '~/types/person';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { JSX } from 'react/jsx-runtime';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import {
  Mail,
  Calendar,
  Pencil,
  Trash,
  Edit,
  PlusCircle,
  Search,
  UserPlus,
  Users,
  XCircle,
  UserCircle2,
} from 'lucide-react-native';
import { LucideIcon } from 'lucide-react-native';
import BootSplash from 'react-native-bootsplash';
import { AnimatedBootSplash } from '~/components/AnimatedSplash';

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  icon?: LucideIcon;
};

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'none',
  icon: Icon,
}: FormFieldProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 font-medium text-primary">{label}</Text>
      <View className="flex-row items-center rounded-xl border border-neutral border-opacity-30 bg-secondary px-3">
        {Icon && (
          <View className="mr-2">
            <Icon size={18} color="#6B7280" />
          </View>
        )}
        <BottomSheetTextInput
          className="flex-1 py-4 text-primary"
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
}

function PersonItem({
  item,
  index,
  onOpenSheet,
  onDelete,
}: {
  item: Person;
  index: number;
  onOpenSheet: (item: Person) => void;
  onDelete: (id: string) => void;
}) {
  const itemAnimation = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      itemAnimation.value = withSpring(1, { mass: 0.8, damping: 12 });
    }, index * 80);
    return () => clearTimeout(timeout);
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: itemAnimation.value,
    transform: [
      {
        translateX: interpolate(itemAnimation.value, [0, 1], [100, 0], Extrapolation.CLAMP), // Replaces SlideInRight
      },
      {
        translateY: interpolate(itemAnimation.value, [0, 1], [50, 0], Extrapolation.CLAMP),
      },
      {
        scale: interpolate(itemAnimation.value, [0, 1], [0.9, 1], Extrapolation.CLAMP),
      },
    ],
  }));

  const getAvatarColor = () => {
    const colors = ['#F0D9FF', '#D8FFD8', '#FFD8D8', '#D8F0FF', '#FFE8D8', '#FFFFD8'];
    const nameHash = item.name
      .split('')
      .reduce((acc: any, char: string) => acc + char.charCodeAt(0), 0);
    return colors[nameHash % colors.length];
  };

  return (
    <View>
      <Animated.View style={animatedStyle}>
        <View className="mx-4 my-2 overflow-hidden rounded-2xl bg-background shadow-lg">
          <TouchableOpacity
            className="p-4"
            style={{ elevation: 3 }}
            onPress={() => onOpenSheet(item)}
            accessibilityLabel={`Edit ${item.name}`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 flex-row items-center">
                <View
                  className="mr-4 h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: getAvatarColor() }}>
                  <Text className="text-xl font-bold text-primary">
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text className="text-lg font-bold text-text">{item.name}</Text>
                  <View className="mt-1 flex-row items-center">
                    <Mail size={14} color="#6B7280" />
                    <Text className="ml-1 text-sm text-text">{item.email}</Text>
                  </View>
                  {item.age && (
                    <View className="mt-1 flex-row items-center">
                      <Calendar size={14} color="#6B7280" />
                      <Text className="ml-1 text-sm text-text">Age: {item.age}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View className="flex-row">
                <TouchableOpacity
                  className="mr-2 rounded-full bg-accent bg-opacity-10 p-3"
                  onPress={() => onOpenSheet(item)}
                  accessibilityLabel={`Edit ${item.name}`}>
                  <Pencil size={18} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="rounded-full bg-error bg-opacity-10 p-3"
                  onPress={() =>
                    Alert.alert('Confirm Delete', `Are you sure you want to delete ${item.name}?`, [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => onDelete(item.id.toString()),
                      },
                    ])
                  }
                  accessibilityLabel={`Delete ${item.name}`}>
                  <Trash size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<Person>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBootSplash, setShowBootSplash] = useState(true);
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ['60%', '85%'], []);

  const fabAnimation = useSharedValue(0);
  const listAnimation = useSharedValue(0);
  const searchBarAnimation = useSharedValue(0);
  const bottomSheetContentAnimation = useSharedValue(0);

  const { data: persons, isLoading } = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await fetch('/api/list');
      if (!response.ok) throw new Error('Failed to fetch persons');
      const text = await response.text();
      return text ? JSON.parse(text) : [];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (newPerson) => {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([newPerson]),
      });
      if (!response.ok) throw new Error((await response.text()) || 'Failed to add person');
      return await response.text();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
      closeBottomSheet();
      setFormData({});
      Alert.alert(
        'Success',
        isEditing ? 'Person updated successfully' : 'Person added successfully',
        [{ text: 'OK' }]
      );
    },
    onError: (error) => Alert.alert('Error', error.message),
  });

  const updateMutation = useMutation({
    mutationFn: async (person) => {
      const response = await fetch('/api/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
      });
      if (!response.ok) throw new Error((await response.text()) || 'Failed to update person');
      return await response.text();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
      closeBottomSheet();
      setIsEditing(false);
    },
    onError: (error) => Alert.alert('Error', error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error((await response.text()) || 'Failed to delete person');
      return (await response.text()) || null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
      Alert.alert('Success', 'Person deleted successfully', [{ text: 'OK' }]);
    },
    onError: (error) => Alert.alert('Error', error.message),
  });

  const handleBootSplashAnimationEnd = () => {
    setShowBootSplash(false);
    BootSplash.hide();
  };

  useEffect(() => {
    if (!isLoading && showBootSplash) {
    }
  }, [isLoading, showBootSplash]);

  const closeBottomSheet = () => bottomSheetRef.current?.dismiss();

  const handleOpenSheet = (person?: Person) => {
    setFormData(person || {});
    setIsEditing(!!person);
    bottomSheetRef.current?.present();
    bottomSheetContentAnimation.value = 0;
    bottomSheetContentAnimation.value = withTiming(1, { duration: 300 });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      Alert.alert('Error', 'Name and email are required');
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const personData = {
      name: formData.name,
      email: formData.email,
      ...(formData.age ? { age: parseInt(formData.age.toString()) } : {}),
    };

    if (isEditing && formData.id) {
      updateMutation.mutate({ id: formData.id, ...personData } as any);
    } else {
      addMutation.mutate(personData as any);
    }
  };

  const renderFooter = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps) => (
      <BottomSheetFooter {...props}>
        <View className="flex-row gap-4 px-6 pb-6">
          <TouchableOpacity
            onPress={closeBottomSheet}
            className="flex-1 rounded-xl bg-neutral bg-opacity-20 p-4">
            <Text className="text-center font-medium text-secondary">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={
              addMutation.isPending ||
              updateMutation.isPending ||
              !formData.name ||
              !formData.email ||
              !formData.age
            }
            className={`flex-1 rounded-xl bg-primary p-4 ${
              !formData.name || !formData.email || !formData.age ? 'opacity-50' : ''
            }`}>
            {addMutation.isPending || updateMutation.isPending ? (
              <ActivityIndicator color="#D4A017" size="small" />
            ) : (
              <Text className="text-center font-medium text-secondary">
                {isEditing ? 'Update' : 'Add'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
    ),
    [
      closeBottomSheet,
      handleSubmit,
      addMutation.isPending,
      updateMutation.isPending,
      formData.name,
      formData.email,
      isEditing,
      insets.bottom,
    ]
  );

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      const isOpen = index > -1;
      setIsBottomSheetOpen(isOpen);
      fabAnimation.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
      listAnimation.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
      searchBarAnimation.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
    },
    [fabAnimation, listAnimation, searchBarAnimation]
  );

  const filteredPersons = useMemo(() => {
    if (!persons) return [];
    if (!searchQuery.trim()) return persons;

    return persons.filter(
      (person: { name: string; email: string }) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [persons, searchQuery]);

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(fabAnimation.value, [0, 1], [0, 100], Extrapolation.CLAMP) },
      { scale: interpolate(fabAnimation.value, [0, 1], [1, 0], Extrapolation.CLAMP) },
    ],
    opacity: interpolate(fabAnimation.value, [0, 0.5], [1, 0], Extrapolation.CLAMP),
  }));

  const listAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(listAnimation.value, [0, 0.5], [1, 0.7], Extrapolation.CLAMP),
  }));

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(searchBarAnimation.value, [0, 0.5], [1, 0], Extrapolation.CLAMP),
    transform: [
      { translateY: interpolate(searchBarAnimation.value, [0, 1], [0, -50], Extrapolation.CLAMP) },
    ],
  }));

  const bottomSheetContentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(bottomSheetContentAnimation.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    transform: [
      {
        translateY: interpolate(
          bottomSheetContentAnimation.value,
          [0, 1],
          [20, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isBottomSheetOpen) {
        closeBottomSheet();
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [isBottomSheetOpen]);

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Person; index: number }) => (
      <PersonItem
        item={item}
        index={index}
        onOpenSheet={handleOpenSheet}
        onDelete={(id: string) => deleteMutation.mutate(id)}
      />
    ),
    [deleteMutation.mutate]
  );

  if (showBootSplash) {
    return <AnimatedBootSplash onAnimationEnd={handleBootSplashAnimationEnd} />;
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-secondary">
        <ActivityIndicator size="large" color="#1A3C34" />
        <Text className="mt-4 text-base font-medium text-primary">Loading persons...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-secondary">
      <Animated.View style={searchBarAnimatedStyle} className="bg-secondary px-4 pt-4">
        <View className="mb-2 flex-row items-center rounded-xl border border-neutral border-opacity-30 bg-background px-3">
          <Search size={20} color="#6B7280" />
          <View className="flex-1">
            <TextInput
              className="px-2 py-3 text-text"
              placeholder="Search persons..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyLabel="Search"
              returnKeyType="search"
            />
          </View>
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <XCircle size={20} color="#6B7280" />
            </TouchableOpacity>
          ) : null}
        </View>
      </Animated.View>

      <Animated.View style={listAnimatedStyle} className="flex-1">
        <FlatList
          data={filteredPersons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: insets.bottom + 80 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="mt-16 flex-1 items-center justify-center p-8">
              <Animated.View style={bottomSheetContentAnimatedStyle}>
                <Users size={64} color="#6B7280" />
                <Text className="mt-6 text-center text-xl font-medium text-primary">
                  {searchQuery ? 'No matching persons found' : 'No persons yet'}
                </Text>
                <Text className="mt-2 text-center text-neutral">
                  {searchQuery ? 'Try a different search term' : 'Add someone to get started!'}
                </Text>
                {searchQuery && (
                  <TouchableOpacity
                    onPress={() => setSearchQuery('')}
                    className="mt-4 rounded-lg bg-accent bg-opacity-20 px-4 py-2">
                    <Text className="font-medium text-primary">Clear search</Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            </View>
          }
        />
      </Animated.View>

      <Animated.View className="absolute bottom-6 right-6" style={fabAnimatedStyle}>
        <TouchableOpacity
          onPress={() => handleOpenSheet()}
          className="h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg"
          style={{ elevation: 6 }}>
          <PlusCircle size={32} color="#D4A017" />
        </TouchableOpacity>
      </Animated.View>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        enablePanDownToClose
        enableHandlePanningGesture
        enableDynamicSizing={false}
        keyboardBehavior="fillParent"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        bottomInset={(insets?.bottom ?? 0) + 24}
        topInset={insets?.top ?? 0}
        containerStyle={{ borderRadius: 10, marginHorizontal: 16 }}
        accessibilityLabel={isEditing ? 'Edit person modal' : 'Add person modal'}>
        <BottomSheetView className="flex-1 px-6 pt-4">
          <Animated.View style={bottomSheetContentAnimatedStyle}>
            <View className="mb-6 flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-opacity-20">
                {isEditing ? (
                  <Edit size={24} color="#1A3C34" />
                ) : (
                  <UserPlus size={24} color="#1A3C34" />
                )}
              </View>
              <Text className="text-2xl font-bold text-primary">
                {isEditing ? 'Edit Person' : 'Add New Person'}
              </Text>
            </View>
            <View className="space-y-2">
              <FormField
                label="Full Name"
                value={formData.name || ''}
                onChangeText={(text: string) => setFormData((prev) => ({ ...prev, name: text }))}
                placeholder="Enter full name"
                autoCapitalize="words"
                icon={UserCircle2}
              />
              <FormField
                label="Email Address"
                value={formData.email || ''}
                onChangeText={(text: string) => setFormData((prev) => ({ ...prev, email: text }))}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
                icon={Mail}
              />
              <FormField
                label="Age"
                value={formData.age?.toString() || ''}
                onChangeText={(text: string) =>
                  setFormData((prev) => ({ ...prev, age: parseInt(text, 10) || 0 }))
                }
                placeholder="Enter age"
                keyboardType="numeric"
                icon={Calendar}
              />
            </View>
          </Animated.View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
