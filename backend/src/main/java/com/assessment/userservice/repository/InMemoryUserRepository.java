package com.assessment.userservice.repository;

import com.assessment.userservice.model.Address;
import com.assessment.userservice.model.AddressType;
import com.assessment.userservice.model.User;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Runtime, in-memory store standing in for a real database as allowed by
 * the assignment. Data lives only for the lifetime of the JVM and is not
 * thread-safe beyond what ConcurrentHashMap provides, which is sufficient
 * for a single-instance demo service.
 */
@Repository
public class InMemoryUserRepository implements UserRepository {

    private final Map<Long, User> usersById = new ConcurrentHashMap<>();
    private final AtomicLong userIdSequence = new AtomicLong();
    private final AtomicLong addressIdSequence = new AtomicLong();

    @PostConstruct
    public void seed() {
        User john = newUser("john.doe@example.com", "John", "Doe");
        addAddress(john.getId(), address("221B Baker Street", null, "London", "Greater London", "NW1 6XE", "United Kingdom", AddressType.HOME));
        addAddress(john.getId(), address("48 Farringdon Road", "Suite 200", "London", "Greater London", "EC1M 3JH", "United Kingdom", AddressType.WORK));

        User jane = newUser("jane.smith@example.com", "Jane", "Smith");
        addAddress(jane.getId(), address("500 5th Avenue", "Apt 12", "New York", "NY", "10110", "United States", AddressType.HOME));

        User carlos = newUser("carlos.ruiz@example.com", "Carlos", "Ruiz");
        addAddress(carlos.getId(), address("Calle Gran Via 28", null, "Madrid", "Madrid", "28013", "Spain", AddressType.HOME));
        addAddress(carlos.getId(), address("Paseo de la Castellana 100", "Planta 4", "Madrid", "Madrid", "28046", "Spain", AddressType.WORK));
        addAddress(carlos.getId(), address("Avenida Diagonal 200", null, "Barcelona", "Catalonia", "08018", "Spain", AddressType.OTHER));

        newUser("mei.chen@example.com", "Mei", "Chen");
    }

    private User newUser(String email, String firstName, String lastName) {
        User user = User.builder()
                .id(userIdSequence.incrementAndGet())
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .build();
        usersById.put(user.getId(), user);
        return user;
    }

    private Address address(String line1, String line2, String city, String state,
                             String postalCode, String country, AddressType type) {
        return Address.builder()
                .line1(line1)
                .line2(line2)
                .city(city)
                .state(state)
                .postalCode(postalCode)
                .country(country)
                .type(type)
                .build();
    }

    @Override
    public List<User> findAll() {
        return new ArrayList<>(usersById.values());
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(usersById.get(id));
    }

    @Override
    public User save(User user) {
        usersById.put(user.getId(), user);
        return user;
    }

    @Override
    public Address addAddress(Long userId, Address address) {
        User user = usersById.get(userId);
        if (user == null) {
            return null;
        }
        address.setId(addressIdSequence.incrementAndGet());
        user.getAddresses().add(address);
        return address;
    }

    @Override
    public Optional<Address> findAddress(Long userId, Long addressId) {
        return findById(userId)
                .flatMap(user -> user.getAddresses().stream()
                        .filter(a -> a.getId().equals(addressId))
                        .findFirst());
    }

    @Override
    public Address updateAddress(Long userId, Address address) {
        return findById(userId)
                .map(user -> {
                    List<Address> addresses = user.getAddresses();
                    for (int i = 0; i < addresses.size(); i++) {
                        if (addresses.get(i).getId().equals(address.getId())) {
                            addresses.set(i, address);
                            return address;
                        }
                    }
                    return null;
                })
                .orElse(null);
    }

    @Override
    public boolean deleteAddress(Long userId, Long addressId) {
        return findById(userId)
                .map(user -> user.getAddresses().removeIf(a -> a.getId().equals(addressId)))
                .orElse(false);
    }
}
